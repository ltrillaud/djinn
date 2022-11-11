import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular'
import { SsoService } from './sso.service'

export const initializeSso = (
  keycloakService: KeycloakService,
  ssoService: SsoService,
  bypassSsoConfig: string,
  bypassSsoDomain: string,
) => {
  return (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {

      // --- deduce ssoAuth from url
      const hostname = window.location.hostname
      let ssoConfigName = ''
      if (bypassSsoConfig === '') {
        const matches = hostname.match(/^([^-\.]*)-/)
        const hostPart = matches?.length === 2 ? matches[1] : ''
        if (hostPart !== '') {
          ssoConfigName = hostPart
        } else {
          ssoConfigName = 'oid'
        }
      } else {
        ssoConfigName = bypassSsoConfig
      }
      ssoService.setup(ssoConfigName, bypassSsoDomain)

      const ssoAuth = ssoService.ssoConfig
      console.log(`     ssoAuthFact.ts parameters : ` +
        `hostname(${hostname}) autoDomain(${ssoService.ssoDomainName})` +
        ` autoAuth(${ssoService.ssoConfigName}) isValid(${!!ssoAuth})`
      )

      if (ssoAuth && ssoAuth.ssoType === 'oid') {
        // --- subscribe to keycloak listener
        keycloakService.keycloakEvents$.subscribe({
          next: (event: KeycloakEvent) => {
            switch (event.type) {
              case KeycloakEventType.OnAuthError:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnAuthError), args`, event.args)
                break
              case KeycloakEventType.OnAuthLogout:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnAuthLogout), args`, event.args)
                break
              case KeycloakEventType.OnAuthRefreshError:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnAuthRefreshError), args`, event.args)
                break
              case KeycloakEventType.OnAuthRefreshSuccess:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnAuthRefreshSuccess), args`, event.args)
                break
              case KeycloakEventType.OnAuthSuccess:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnAuthSuccess), args`, event.args)
                break
              case KeycloakEventType.OnReady:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnReady), args`, event.args)
                break
              case KeycloakEventType.OnTokenExpired:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(OnTokenExpired), args`, event.args)
                break
              default:
                console.log(`     ssoAuthFact.ts keycloakEvent next type(unknown), args`, event.args)
                break;
            }
          },
          error: (error: any) => {
            console.warn(`     ssoAuthFact.ts keycloakEvent error`, error)
          },
          complete: () => {
            console.log(`     ssoAuthFact.ts keycloakEvent complete`)
          },
        })

        // --- initialyze keycloak
        const silentCheckSsoRedirectUri = window.location.origin + '/assets/silent-check-sso.html'
        const armorialPath = ssoAuth.armorialHost
        console.log(`     ssoAuthFact.ts keycloak init armorialPath(${armorialPath}), ` +
          `realm(${ssoAuth.realm}), clientId(${ssoAuth.clientId}), redirect(${silentCheckSsoRedirectUri})`
        )
        keycloakService.init({
          config: {
            url: armorialPath,
            realm: ssoAuth.realm,
            clientId: ssoAuth.clientId,
          },
          // initOptions: {
          //   redirectUri: window.location.origin
          // }
          initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },
        }).then(data => {
          console.log('     ssoAuthFact.ts keycloak init finish succeed', data)
          resolve()
        }).catch(error => {
          console.log('     ssoAuthFact.ts keycloak init finish failed', error)
          reject()
        })
      } else {
        resolve()
      }
    })
  }
}

