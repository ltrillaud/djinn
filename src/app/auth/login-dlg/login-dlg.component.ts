import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SsoService } from '../sso.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login-dlg',
  templateUrl: './login-dlg.component.html',
  styleUrls: ['./login-dlg.component.scss']
})
export class LoginDlgComponent implements OnInit {
  @Input() title = 'No Title'
  @Input() subTitle = 'No Sub Title'
  @Input() version = '0.0.0'
  @Input() redirect = '/'
  @Input() username = ''
  @Input() password = ''

  hide = true
  model = { login: '', password: '' }
  loginCtl = new FormControl('', [Validators.required])
  passwordCtl = new FormControl('', [Validators.required])
  message = 'Saisissez vos informations de connexion'
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private ssoService: SsoService,
  ) {
    this.message = this.router.getCurrentNavigation()?.extras?.state?.['msg']
      || 'Saisissez vos informations de connexion'
  }

  async ngOnInit(): Promise<void> {
    console.log(`    loginDlgComp.ts ngOnInit redirect(${this.redirect}) username(${this.username})`)
    if (this.username && this.password) {
      // try auto-connect if information provided 
      console.log(`    loginDlgComp.ts authService automatic challenging ...`)
      await this.authService.challengeLogin(this.username, this.password)
      if (this.authService.user.isAuthenticated) {
        console.log(`    loginDlgComp.ts authService automatic challenging ok => redirect`)
        this.gotoRedirect()
      } else {
        console.log(`    loginDlgComp.ts authService automatic challenging ko => dialog`)
      }
    }
  }

  onConnect(): void {
    this.message = `Authentification en cours ...`
    this.loading = true

    this.authService.challengeLogin(this.model.login, this.model.password).then(() => {
      console.log(`    loginDlgComp.ts authService manuel challenge`)
      this.loading = false
      this.message = ''
      if (!this.authService.user.isAuthenticated) {
        this.message = 'Erreur d\'authentification !'
      } else {
        this.gotoRedirect()
      }
    })
  }

  onPasswordEnter(event: Event): void {
    // don't trigger toggle password
    event.preventDefault()
    this.onConnect()
  }

  private gotoRedirect() {
    // Get the redirect URL from our auth service
    // If no redirect has been set, use the default
    const redirect = this.authService.redirectUrl || '/'

    // Redirect the user
    console.log(`    loginDlgComp.ts onConnect redirect to(${redirect})`)
    this.router.navigateByUrl(redirect)
  }
}
