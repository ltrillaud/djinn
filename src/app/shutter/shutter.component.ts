import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'

type ShutterType = 'PR' | 'AR' | 'JRS' | 'JRE' | 'JRP' | 'UR' | 'SR' | 'MR' | 'CR'
type ModeType = 'O' | 'C'

interface Shutter {
  key: ShutterType
  label: string
}

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.scss']
})
export class ShutterComponent {
  shutters: Shutter[] = [
    { key: 'UR', label: 'Bureau' },
    { key: 'CR', label: 'Cuisine' },
    { key: 'JRP', label: 'Séjour Porte' },
    { key: 'JRS', label: 'Séjour Sud' },
    { key: 'JRE', label: 'Séjour Est' },
    { key: 'SR', label: 'Salon' },
    { key: 'PR', label: 'Chambre Parentale' },
    { key: 'MR', label: 'Chambre Maureen' },
    { key: 'AR', label: 'Chambre Amandine' },
  ]
  constructor(
    private httpClient: HttpClient,
  ) { }

  async onChange(shutter: ShutterType, mode: ModeType) {
    const url = `${environment.owServerHost}/apl/${shutter}`
    const response = await lastValueFrom(this.httpClient.put(url, { value: mode }))
  }

}
