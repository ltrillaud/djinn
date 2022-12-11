import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Appliances, ModeType } from 'src/app/appliances.model'
import { AppliancesService } from 'src/app/appliances.service'
import { c } from 'src/app/console'

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.scss']
})
export class AppliancesComponent implements OnChanges {
  @Input('appliances') appliances: Appliances = {}

  constructor(
    private appliancesService: AppliancesService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(c(this), `onChanges`, changes)
  }

  onFavorite(applianceKey: string) {
    const isFavorite = this.appliancesService.toggleFavorite(applianceKey)
    this.appliances[applianceKey].isFavorite = isFavorite
  }

  async onUpdate(applianceKey: string, mode: ModeType) {
    this.appliancesService.onUpdate(applianceKey, mode)
    this.appliances[applianceKey].mode = mode
  }

  unsorted(): number { return 0 }
}
