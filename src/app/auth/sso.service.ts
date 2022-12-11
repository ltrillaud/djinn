import { Inject, Injectable, InjectionToken } from '@angular/core'

export const SSO_CONFIG_NAME_TOKEN = new InjectionToken('SSO_CONFIG_NAME')
export const SSO_DOMAIN_NAME_TOKEN = new InjectionToken('SSO_DOMAIN_NAME')

export type TSsoType = 'direct' | 'oid'

export interface ISsoConfig {
  ssoType: TSsoType
  label: string
  clientId: string
  realm: string
  scope: string
  owServerHost: string
  armorialHost: string
}

export type TSsoConfigs = { [key: string]: ISsoConfig }

@Injectable({
  providedIn: 'root'
})
export class SsoService {
  ssoDomainName = ''
  domain = ''

  ssoConfigs: TSsoConfigs = {
    oid: {
      ssoType: 'oid',
      label: 'Trillaud SSO',
      clientId: 'trillaud',
      realm: 'tools',
      scope: 'openid offline_access',
      owServerHost: 'https://owfs.trillaud.com',
      armorialHost: 'https://auth.trillaud.com',
    },
    direct: {
      ssoType: 'direct',
      label: 'Trillaud Direct',
      clientId: 'trillaud',
      realm: 'tools',
      scope: 'openid offline_access',
      owServerHost: 'https://owfs.trillaud.com',
      armorialHost: 'https://auth.trillaud.com',
    },
  }

  private _ssoConfig!: ISsoConfig
  get ssoConfig(): ISsoConfig {
    return this._ssoConfig
  }

  private _ssoConfigName = ''
  get ssoConfigName(): string {
    return this._ssoConfigName
  }
  set ssoConfigName(ssoConfigName: string) {
    this._ssoConfigName = ssoConfigName
    this._ssoConfig = this.ssoConfigs[ssoConfigName]
    console.log(`         ssoServ.ts choose ssoConfig(${this._ssoConfigName})`, this._ssoConfig)
  }

  constructor() {
    console.log(`         ssoServ.ts constructor`)
  }

  setup(ssoConfigName: string, ssoDomainName: string) {
    this.ssoConfigName = ssoConfigName
    this.ssoDomainName = ssoDomainName

    const rg = /https:\/\/[^.]*.([^.]*).([^.]*)/

    let origin = 'https://acme.trillaud.com'
    if (this.ssoDomainName) {
      origin = `https://acme.${this.ssoDomainName}`
    } else if (location.origin.indexOf('localhost') === -1) {
      origin = location.origin
    }

    // keep the root domain
    const matches = rg.exec(origin)
    if (matches && matches.length === 3) {
      this.domain = matches.splice(1).join('.')
    }
    console.log(`         ssoServ.ts setup, origin(${origin}), domain(${this.domain})`)

  }

  buildHostName(prefix: string, protocol: string = 'https'): string {
    return `${protocol}://${prefix}.${this.domain}`
  }
}
