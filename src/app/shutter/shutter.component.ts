import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'

type ShutterType = 'PR' | 'AR' | 'JRS' | 'JRE' | 'JRP' | 'UR' | 'SR' | 'MR' | 'CR'
type ModeType = 'O' | 'C'

interface Shutter {
  label: string
}

interface Group {
  label: string
  shutters: ShutterType[]
}

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.scss']
})
export class ShutterComponent {
  shutters: { [key in ShutterType]: Shutter } = {
    UR: { label: 'Bureau' },
    CR: { label: 'Cuisine' },
    SR: { label: 'Salon' },
    JRP: { label: 'Séjour Porte' },
    JRS: { label: 'Séjour Sud' },
    JRE: { label: 'Séjour Est' },
    PR: { label: 'Chambre Parentale' },
    MR: { label: 'Chambre Maureen' },
    AR: { label: 'Chambre Amandine' },
  }

  groups: Group[] = [
    { label: 'Boulot', shutters: ['UR', 'SR', 'CR'] },
    { label: 'Réveil', shutters: ['JRP', 'JRS', 'JRE', 'PR'] },
    { label: 'Étage', shutters: ['AR', 'MR'] },
  ]


  constructor(
    private httpClient: HttpClient,
  ) { }

  async onChange(shutter: string, mode: ModeType) {
    const url = `${environment.owServerHost}/apl/${shutter}`
    const response = await lastValueFrom(this.httpClient.put(url, { value: mode }))
  }

  async onGroup(label: string, mode: ModeType) {
    const group = this.groups.find(group => group.label === label)
    for (const shutter of group!.shutters) {
      const url = `${environment.owServerHost}/apl/${shutter}`
      await lastValueFrom(this.httpClient.put(url, { value: mode }))
    }
  }

  onFavorite(label: string) {

  }
  unsorted(): number { return 0 }
}
