import { Component, OnInit } from '@angular/core'
import { Appliances } from '../appliances.model'
import { AppliancesService } from '../appliances.service'
import { c } from '../console'

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.scss']
})
export class HeaterComponent implements OnInit {
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

  ngOnInit(): void {
    // then update the appliances
    Object.keys(this.appliances).map((key) => {
      this.appliancesService.fetchAppliance(key)
    })
  }
}
