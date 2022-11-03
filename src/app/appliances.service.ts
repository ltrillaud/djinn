import { Injectable } from '@angular/core'

import { environment } from '../environments/environment'


export interface Appliance {
  label: {
    line1: string
    line2: string
  }
  isFavorite: boolean
}
export interface Appliances { [index: string]: Appliance }

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {
  private readonly storageName = 'djinn-favorites'
  favorites: string[] = []
  appliances = environment.appliances

  constructor() {
    // restore favorite from local Storage
    this.favorites = this.getFavorites()
    console.log(`    applianceServ.ts favorites`, this.favorites)

    // update favorite in appliances
    for (const id of this.favorites) {
      this.appliances[id].isFavorite = true
    }
  }

  getFavorites(): string[] {
    const applianceIds = Object.keys(this.appliances)
    let favorites: string[] = []
    const raw = localStorage.getItem(this.storageName) || ''
    try {
      const ids = JSON.parse(raw)
      if (Array.isArray(ids)) {
        // filter fake ids
        favorites = ids.filter(id => applianceIds.includes(id))
      } else {
        console.warn(`'${this.storageName}' should be an array in localStorage`)
      }
    } catch (error) {
      console.warn(`'${this.storageName}' should be a valid JSON in localStorage`)
    }
    return favorites
  }

  pushFavorite(id: string) {
    this.favorites.push(id)
    localStorage.setItem(this.storageName, JSON.stringify(this.favorites))
  }

  pullFavorite(id: string) {
    const idx = this.favorites.indexOf(id)
    if (idx !== -1) {
      this.favorites.splice(idx, 1)
      localStorage.setItem(this.storageName, JSON.stringify(this.favorites))
    } else {
      console.warn(`'${this.storageName}'pull favorite (${id}) not in localStorage`)
    }
  }

  toggleFavorite(applianceKey: string): boolean {
    let isFavorite: boolean
    const idx = this.favorites.indexOf(applianceKey)
    if (idx !== -1) {
      this.favorites.splice(idx, 1)
      isFavorite = false
    } else {
      this.favorites.push(applianceKey)
      isFavorite = true
    }
    localStorage.setItem(this.storageName, JSON.stringify(this.favorites))
    this.appliances[applianceKey].isFavorite = isFavorite
    console.log(`  appliancesServ.ts toggleFavorite(${applianceKey})=(${isFavorite})`)
    return isFavorite
  }
}
