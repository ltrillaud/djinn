import { Component } from '@angular/core'
import { Appliances } from '../appliances.model'
import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.scss']
})
export class ShutterComponent {
  applianceIds: string[] = ['UR', 'CR', 'SR', 'JRP', 'JRS', 'JRE', 'PR', 'MR', 'AR']
  groupsIds: string[] = ['boulot', 'reveil', 'etage']
  appliances: Appliances = {}
  groups: Appliances = {}

  constructor(
    private appliancesService: AppliancesService,
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

}
