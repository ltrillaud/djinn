import { Component, OnInit } from '@angular/core';
import { Appliances, AppliancesService } from '../appliances.service';


interface Temperature {
  key: string
  label: {
    line1: string
    line2: string
  }
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  applianceIds: string[] = ['J1P', 'C1P', 'U1', /*'P1',*/ 'M1', 'A1', 'B1', 'X1', 'R1', 'H1']
  groupsIds: string[] = ['livingRoom', 'haut']
  appliances: Appliances = {}
  groups: Appliances = {}

  constructor(
    private appliancesService: AppliancesService
  ) {
    // filter appliance for this page
    for (const [key, appliance] of Object.entries(this.appliancesService.appliances)) {
      if (this.applianceIds.includes(key)) {
        this.appliances[key] = appliance
      }
      if (this.groupsIds.includes(key)) {
        this.groups[key] = appliance
      }
    }
  }

  ngOnInit(): void {
  }

  onFavorite(applianceKey: string) {
    const isFavorite = this.appliancesService.toggleFavorite(applianceKey)
    this.appliances[applianceKey].isFavorite = isFavorite
  }
}
