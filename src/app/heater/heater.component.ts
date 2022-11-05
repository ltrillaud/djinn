import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'
import { Appliances, AppliancesService } from '../appliances.service'

type HeaterType = 'S' | 'R' | 'A' | 'M' | 'P'
type ModeType = 'C' | '1' | '2' | 'E'

interface Heater {
  key: HeaterType
  mode: ModeType
  label: {
    line1: string
    line2: string
  }
}

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.scss']
})
export class HeaterComponent implements OnInit {
  applianceIds: string[] = ['S', 'P', 'M', 'A', 'R']
  appliances: Appliances = {}

  heaters: Heater[] = [
    { key: 'S', mode: 'E', label: { line1: 'Salon et', line2: 'Séjour' } },
    { key: 'P', mode: 'E', label: { line1: 'Chambre', line2: 'Parentale' } },
    { key: 'M', mode: 'E', label: { line1: 'Chambre', line2: 'Maureen' } },
    { key: 'A', mode: 'E', label: { line1: 'Chambre', line2: 'Amandine' } },
    { key: 'R', mode: 'E', label: { line1: 'Salle de', line2: 'Bain' } },
  ]
  constructor(
    private appliancesService: AppliancesService,
    private httpClient: HttpClient,
  ) {
    // filter appliance for this page
    for (const [key, appliance] of Object.entries(this.appliancesService.appliances)) {
      if (this.applianceIds.includes(key)) {
        this.appliances[key] = appliance
      }
    }
  }

  ngOnInit(): void {
  }

  async onChange(key: HeaterType, mode: ModeType) {
    const url = `${environment.owServerHost}/apl/${key}`
    const response = await lastValueFrom(this.httpClient.put(url, { value: mode }))
    const heater = this.heaters.find(heater => heater.key === key)
    heater!.mode = mode
  }

  onFavorite(label: string) { }
}
