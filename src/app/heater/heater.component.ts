import { Component, OnInit } from '@angular/core'
import { Appliances } from '../appliances.model'
import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.scss']
})
export class HeaterComponent {
  applianceIds: string[] = ['S', 'P', 'M', 'A', 'R']
  appliances: Appliances = {}

  constructor(
    private appliancesService: AppliancesService,
  ) {
    // filter appliance for this page
    for (const [key, appliance] of Object.entries(this.appliancesService.appliances)) {
      if (this.applianceIds.includes(key)) {
        this.appliances[key] = appliance
      }
    }
  }
}
