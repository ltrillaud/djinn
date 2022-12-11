import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public appliancesService: AppliancesService,
  ) { }

  ngOnInit(): void {
    // then update the appliances
    Object.keys(this.appliancesService.favoriteAppliances).map((key) => {
      this.appliancesService.fetchAppliance(key)
    })
  }
}
