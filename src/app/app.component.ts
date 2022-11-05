import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '../environments/environment'
import { AppliancesService } from './appliances.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mainMenus = environment.mainMenus

  constructor(
    private router: Router,
    private appliancesService: AppliancesService,
  ) { }

  onGoto(page: string) {
    this.router.navigate([page])
  }
}
