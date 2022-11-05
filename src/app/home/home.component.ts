import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'
import { Appliances, AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mainMenus = environment.mainMenus.filter(menu => menu.page !== 'home')
  applianceIds: string[]
  appliances: Appliances = {}

  constructor(
    private router: Router,
    private appliancesService: AppliancesService,
  ) {
    this.applianceIds = this.appliancesService.getFavorites()
  }

  ngOnInit(): void {
    // filter appliance for this page
    this.appliances = this.buildAppliances()
  }

  onGoto(page: string) {
    this.router.navigate([page])
  }

  onFavorite(applianceKey: string) {
    const isFavorite = this.appliancesService.toggleFavorite(applianceKey)
    this.appliances[applianceKey].isFavorite = isFavorite
    this.appliances = this.buildAppliances()
  }

  private buildAppliances(): Appliances {
    const out: Appliances = {}
    for (const [key, appliance] of Object.entries(this.appliancesService.appliances)) {
      if (this.applianceIds.includes(key)) {
        out[key] = appliance
      }
    }
    return out
  }
}
