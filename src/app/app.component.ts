import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullMenus = environment.mainMenus
  shortMenus = environment.mainMenus.filter(menu => menu.page !== 'logout')

  constructor(
    private router: Router,
  ) { }

  onGoto(page: string) {
    this.router.navigate([page])
  }
}
