// tslint:disable: no-non-null-assertion
import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'

import { AuthService } from './auth.service'
import { KeycloakService } from 'keycloak-angular'
import { SsoService } from './sso.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private ssoService: SsoService,
    private router: Router,
    private keycloakService: KeycloakService,
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return await this.guardAuth(state)
  }

  async guardAuth(
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // for debug check keycloak before
    const result = await this.keycloakService.isLoggedIn()

    let isAllowed: boolean
    if (this.authService.isLogin) {
      // --- The user is fully logged
      isAllowed = true
    } else if (await this.keycloakService.isLoggedIn()) {
      // Unable to call loadUserProfile due to CORS problem
      // const profile = await this.keycloakService.loadUserProfile()
      // console.log(`       authGuard.ts keycloak profile`, profile)

      // --- keycloak logged by not yet propagate to authService
      const authOutput = this.authService.getAuthOuput()
      console.log(`       authGuard.ts keycloak logged, rebuilded authOutput`, authOutput)
      this.authService.user = await this.authService.result2user(
        '', // will be fill by jwt prefered_username
        // profile.username!, // Restore it, if loadUserProfile works
        authOutput
      )

      // get the config
      this.authService.triggerRefreshForOid()
      this.authService.triggerLogout()
      await this.authService.finishLogin()
      isAllowed = true
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = state.url
      console.log(`       authGuard.ts prepare relayState(${state.url})`)

      // Navigate to the login page with extras
      const ssoAuth = this.ssoService.ssoConfig
      const redirectUri = window.location.origin + state.url
      if (ssoAuth.ssoType === 'oid') {
        console.log(`       authGuard.ts redirectUri(${redirectUri})`)
        try {
          await this.keycloakService.login({ redirectUri })
        } catch (error) {
          console.warn('       authGuard.ts keycloak login error', error)
        }
      } else {
        console.log(`       authGuard.ts url(${state.url}) ssoAuth(${this.ssoService.ssoConfigName}) ` +
          `type(${ssoAuth.ssoType}) redirect to login`
        )
        await this.authService.login()
      }
      isAllowed = false
    }
    console.log(`       authGuard.ts authGuard canActivate url(${state.url}) ` +
      `authLogin(${this.authService.isLogin}) kckLogin(${result}) => isAllowed(${isAllowed})`)

    return isAllowed
  }
}

