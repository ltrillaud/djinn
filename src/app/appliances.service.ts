import { Injectable } from '@angular/core'

import { environment } from '../environments/environment'

export interface Appliance {
  id: string
  label: {
    line1: string
    line2: string
  }
  isFavorite: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {

  constructor() { }
}
