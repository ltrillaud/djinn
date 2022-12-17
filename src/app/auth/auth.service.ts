// tslint:disable: no-non-null-assertion

import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { KeycloakService } from 'keycloak-angular'
import { KJUR } from 'jsrsasign'

import { ISsoConfig, SsoService } from './sso.service'
import { c } from '../console'


export const SERVICE_PROVIDER_NAME_TOKEN = new InjectionToken('SERVICE_PROVIDER_NAME')

export type TServiceProvider = 'djinn'

export interface IJwtPayload {
  exp?: number
  nbf?: number
  iat?: number
  iss?: string
  preferred_username?: string
  spatial_username?: string
}


export interface IAuthOutput {
  'access_token': string
  'expires_in': number
  'id_token'?: string
  'not_before_policy'?: number
  'refresh_expires_in'?: number
  'refresh_token'?: string
  'scope'?: string
  'session_state'?: string
  'token_type'?: string
}

export type TLoginAction = 'login' | 'logout' | 'refresh'
export interface IOnLogin {
  action: TLoginAction
  user: User
}

export class User {
  defaultRoute?: string
  appIdSelected?: string
  accessPayload?: IJwtPayload
  refreshPayload?: IJwtPayload

  get jwt(): string {
    return this.authOutput?.access_token || ''
  }
  get isAuthenticated(): boolean {
    return this.id !== 'anonymous'
  }

  constructor(
    public id: string = 'anonymous',
    public ssoId: string = '',
    public displayName: string = 'anonymous',
    public spatialUser: string = '',
    public authOutput?: IAuthOutput,
    public authConfig?: ISsoConfig,
  ) {
    this.refreshTokens(this.authOutput?.access_token, this.authOutput?.refresh_token)
  }

  refreshTokens(accessToken?: string, refreshToken?: string) {
    if (accessToken) {
      this.authOutput!.access_token = accessToken
      const parts = accessToken.split('.')
      this.accessPayload = KJUR.jws.JWS.readSafeJSONString(b64ToUtf8(parts[1])) as IJwtPayload
    }
    if (refreshToken) {
      this.authOutput!.refresh_token = refreshToken
      const parts = refreshToken.split('.')
      this.refreshPayload = KJUR.jws.JWS.readSafeJSONString(b64ToUtf8(parts[1])) as IJwtPayload
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  offlineTokenName = 'offline-token'
  user: User = new User()

  isLogin = false
  onLogin = new BehaviorSubject<IOnLogin>({ action: 'logout', user: new User() })
  onLogin$ = this.onLogin.asObservable()

  logoutTimerHandle: any
  intervalHandle: any
  redirectUrl: string // store the URL so we can redirect after logging in

  constructor(
    @Inject(SERVICE_PROVIDER_NAME_TOKEN) public serviceProviderName: any,
    private router: Router,
    private httpClient: HttpClient,
    private keycloakService: KeycloakService,
    private ssoService: SsoService,
  ) {
    console.log(`        authServ.ts constructor serviceProviderName(${this.serviceProviderName})`)
    this.redirectUrl = ''
  }

  async login() {
    const offlineToken = localStorage.getItem(this.offlineTokenName)
    if (offlineToken) { // try to login with offline-token
      const authConfig = this.ssoService.ssoConfig
      this.user = await this.keycloakRefresh(authConfig, offlineToken)
      if (this.user.id !== 'anonymous') {
        this.triggerRefreshForDirect()
        await this.finishLogin()
        this.router.navigate([this.redirectUrl])
      } else {
        console.log(c(this), `login by offline-token failed`)
        this.router.navigate(['/login'])
      }
    } else { // never login before -> redirect to login page
      this.router.navigate(['/login'])
    }
  }

  async challengeLogin(login: string, password: string): Promise<void> {
    const authConfig = this.ssoService.ssoConfig
    this.user = await this.keycloakAuthenticate(authConfig, login, password)

    if (this.user.id !== 'anonymous') {
      await this.finishLogin()
    }
  }

  async result2user(login: string, authOutput: any): Promise<User> {
    let user: User
    if (authOutput && authOutput.hasOwnProperty('access_token')) {
      const payload = this.jwt2payload(authOutput.access_token)
      console.log(`        authServ.ts authenticate, jwt payload`, payload)
      if (payload) {
        user = new User(
          login || payload.preferred_username,
          'local',
          payload.preferred_username,
          payload.spatial_username || '',
          authOutput,
          this.ssoService.ssoConfig,
        )
      } else {
        // jwt failed -> reset
        user = new User()
      }
    } else { // authentication failed -> reset
      user = new User()
    }
    return user
  }

  jwt2payload(jwt: string): IJwtPayload | null {
    const parts = jwt.split('.')
    return KJUR.jws.JWS.readSafeJSONString(b64ToUtf8(parts[1]))
  }

  getAuthOuput(): IAuthOutput {
    const keycloakInstance = this.keycloakService.getKeycloakInstance()
    const authOutput: IAuthOutput = {
      access_token: keycloakInstance.token!,
      expires_in: (keycloakInstance.tokenParsed?.exp || 0) - (keycloakInstance.tokenParsed?.iat || 0),
      id_token: keycloakInstance.idToken,
      // not_before_policy: payload?.nbf,
      refresh_token: keycloakInstance.refreshToken,
      refresh_expires_in: (keycloakInstance.refreshTokenParsed?.exp || keycloakInstance.refreshTokenParsed?.iat || 0) - (keycloakInstance.refreshTokenParsed?.iat || 0),
      // scope: ?,
      session_state: keycloakInstance.tokenParsed?.session_state,
      token_type: keycloakInstance.tokenParsed?.['typ']
    }
    // console.log(`>>> ki tokenParsed`, keycloakInstance.tokenParsed)
    // console.log(`>>> ki refreshParsed`, keycloakInstance.refreshTokenParsed)
    // console.log(`>>> ki offlineParsed`, keycloakInstance.idTokenParsed)

    return authOutput
  }


  async finishLogin(): Promise<void> {
    try {
      this.isLogin = true
      this.onLogin.next({ action: 'login', user: this.user })
    } catch (error) {
      this.user = new User()
    }
  }

  public async buildUser(
    ssoId: string, userId: string, displayName: string, jwt: string, spatialUsername: string,
  ): Promise<void> {
    console.log(`        authServ.ts buildUser ssoId(${ssoId}), userId(${userId}), displayName(${displayName}), spatialUsername(${spatialUsername})`)
    this.user = new User(
      userId,
      ssoId,
      displayName,
      spatialUsername,
      { access_token: jwt, expires_in: -1 },
      this.ssoService.ssoConfigs[ssoId],
    )

    await this.finishLogin()
  }

  askLogout(): void {
    if (this.logoutTimerHandle) {
      clearTimeout(this.logoutTimerHandle)
      this.logoutTimerHandle = null
    }
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
      this.intervalHandle = null
    }
    const userId = this.user.id
    const user = this.user
    this.user = new User()
    this.isLogin = false
    localStorage.removeItem(this.offlineTokenName)
    this.onLogin.next({ action: 'logout', user })
  }

  gotoLogout(): void {
    let redirect: string
    switch (this.ssoService.ssoConfig.ssoType) {
      case 'oid':
        this.keycloakService.logout(window.location.origin + '/logout') // reset the application
        break
      default:
        window.location.href = window.location.origin + '/login' // reset the application
        break
    }
  }

  triggerLogout() {
    const now = new Date().getTime()
    const delay = this.user.accessPayload?.exp! * 1000 - now
    this.logoutTimerHandle = setTimeout(() => {
      this.askLogout()
    }, delay);
  }

  triggerRefreshForOid(): void {
    // setup auto jwt refresh
    const interval = this.user.authOutput!.refresh_expires_in || 60
    console.log(`        authServ.ts triggerRefreshForKeycloak arm interval(${interval}) secs`)
    this.intervalHandle = setInterval(async () => {
      let updateResult: boolean = false
      try {
        updateResult = await this.keycloakService.updateToken(this.user.authOutput!.expires_in!)

        // update user and notify
        const keycloakInstance = this.keycloakService.getKeycloakInstance()
        const accessToken = keycloakInstance.token
        const refreshToken = keycloakInstance.refreshToken
        this.user.refreshTokens(accessToken, refreshToken)
        this.onLogin.next({ action: 'refresh', user: this.user })
      } catch (error) {
        console.log(`        authServ.ts triggerRefreshForKeycloak failed`, error)
      } finally {
        const now = new Date().toISOString()
        console.log(`        authServ.ts triggerRefreshForKeycloak(${updateResult}) @ ${now}`)
      }
    }, interval * 1000)
  }

  triggerRefreshForDirect(): void {
    // setup auto jwt refresh
    const interval = this.user.authOutput!.expires_in || 60
    console.log(`        authServ.ts triggerRefreshForDirect arm interval(${interval}) secs`)
    this.intervalHandle = setInterval(async () => {
      try {
        const offlineToken = localStorage.getItem(this.offlineTokenName)
        this.user = await this.keycloakRefresh(this.user.authConfig!, offlineToken!)
        this.onLogin.next({ action: 'refresh', user: this.user })
      } catch (error) {
        console.log(`        authServ.ts triggerRefreshForDirect failed`, error)
      } finally {
        const now = new Date().toISOString()
        console.log(`        authServ.ts triggerRefreshForDirect(true) @ ${now}`)
      }
    }, interval * 1000)
  }

  private async keycloakAuthenticate(authConfig: ISsoConfig, login: string, password: string): Promise<User> {
    const host = authConfig.armorialHost || location.origin.replace(/https:\/\/[^.]*.(.*)$/, `https://auth.$1`)
    const url = `${host}/realms/${authConfig.realm}/protocol/openid-connect/token`
    console.log(`        authServ.ts keycloakAuthenticate requesting ${url} ...`)
    let user = new User()
    try {
      // prepare the request for an application/x-www-form-urlencoded;charset=UTF-8
      const body = new HttpParams()
        .set('grant_type', 'password')
        .set('client_id', authConfig.clientId)
        .set('scope', authConfig.scope)
        .set('username', login)
        .set('password', password)
      // this angular prototype will auto setup content-type in x-www-form-urlencoded
      const authOutput = await this.httpClient.post<IAuthOutput>(url, body).toPromise()
      console.log(`        authServ.ts keycloakAuthenticate authOutput`, authOutput)
      if (authOutput?.refresh_token) {
        localStorage.setItem(this.offlineTokenName, authOutput.refresh_token)
      }
      user = await this.result2user(login, authOutput)
    } catch (error) {
      console.log(`        authServ.ts request failed error`, error)
    }
    return user
  }

  private async keycloakRefresh(authConfig: ISsoConfig, offlineToken: string): Promise<User> {
    const host = authConfig.armorialHost || location.origin.replace(/https:\/\/[^.]*.(.*)$/, `https://auth.$1`)
    const url = `${host}/realms/${authConfig.realm}/protocol/openid-connect/token`
    console.log(`        authServ.ts keycloakAuthenticate requesting ${url} ...`)
    let user = new User()
    try {
      // prepare the request for an application/x-www-form-urlencoded;charset=UTF-8
      const body = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('client_id', authConfig.clientId)
        .set('refresh_token', offlineToken)

      // this angular prototype will auto setup content-type in x-www-form-urlencoded
      const authOutput = await this.httpClient.post<IAuthOutput>(url, body).toPromise()
      console.log(`        authServ.ts keycloakRefresh authOutput`, authOutput)
      user = await this.result2user('', authOutput)
    } catch (error) {
      console.log(`        authServ.ts request failed error`, error)
    }
    return user
  }

}

function b64ToUtf8(input: string): string {
  return decodeURIComponent(escape(atob(input)))
}
