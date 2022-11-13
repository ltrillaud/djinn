import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'

import { environment } from '../environments/environment'
import { ApplianceResponse, Appliances, ModeType } from './appliances.model'
import { AuthService } from './auth/auth.service'
import { c } from './console'

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {
  private readonly storageName = 'djinn-favorites'
  favoriteIds: string[] = []
  appliances = environment.appliances
  favoriteAppliances: Appliances = {}

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {
    // restore favorite from local Storage
    this.restoreFavoriteIds()
    this.buildFavoriteAppliances()
    console.log(c(this), `favorites`, this.favoriteIds)

    this.authService.onLogin$.subscribe(next => {
      if (next.action === 'login') {
        // first update favorite in appliances
        for (const id of this.favoriteIds) {
          this.appliances[id].isFavorite = true
          this.fetchAppliance(id).then(() => {
            console.log(c(this), `constructor fetchAppliance(${id}) ok`)
          }).catch(error => {
            console.log(c(this), `constructor fetchAppliance(${id}) ko`, error)
          })
        }

        // then update the other appliances
        Object.keys(this.appliances).filter(
          (key) => !this.favoriteIds.includes(key)
        ).map((key) => {
          this.fetchAppliance(key).then(() => {
            console.log(c(this), `constructor fetchAppliance(${key}) ok`)
          }).catch(error => {
            console.log(c(this), `constructor fetchAppliance(${key}) ko`, error)
          })
        })
      }
    })
  }

  pushFavorite(id: string) {
    this.favoriteIds.push(id)
    localStorage.setItem(this.storageName, JSON.stringify(this.favoriteIds))
  }

  pullFavorite(id: string) {
    const idx = this.favoriteIds.indexOf(id)
    if (idx !== -1) {
      this.favoriteIds.splice(idx, 1)
      localStorage.setItem(this.storageName, JSON.stringify(this.favoriteIds))
    } else {
      console.warn(`'${this.storageName}'pull favorite (${id}) not in localStorage`)
    }
  }

  toggleFavorite(applianceKey: string): boolean {
    let isFavorite: boolean
    const idx = this.favoriteIds.indexOf(applianceKey)
    if (idx !== -1) {
      this.favoriteIds.splice(idx, 1)
      isFavorite = false
    } else {
      this.favoriteIds.push(applianceKey)
      isFavorite = true
    }
    localStorage.setItem(this.storageName, JSON.stringify(this.favoriteIds))
    this.appliances[applianceKey].isFavorite = isFavorite
    console.log(`  appliancesServ.ts toggleFavorite(${applianceKey})=(${isFavorite})`)
    this.buildFavoriteAppliances()
    return isFavorite
  }

  async onUpdate(applianceKey: string, mode: ModeType) {
    const appliance = this.appliances[applianceKey]
    for (const aplId of appliance.aplIds) {
      const url = `${environment.owServerHost}/apl/${aplId}`
      console.log(c(this), `fetchAppliance(${url})`)
      try {
        const response = await lastValueFrom(this.httpClient.put(url, { value: mode }))
        console.log(c(this), `onUpdate id(${applianceKey})=(${mode}), response`, response)
      } catch (error) {
        console.log(c(this), `onUpdate failed`, error)
      }
    }
  }

  private restoreFavoriteIds(): void {
    const applianceIds = Object.keys(this.appliances)
    this.favoriteIds = []
    const raw = localStorage.getItem(this.storageName) || ''
    try {
      const ids = JSON.parse(raw)
      if (Array.isArray(ids)) {
        // filter fake ids
        this.favoriteIds = ids.filter(id => applianceIds.includes(id))
      } else {
        console.warn(`'${this.storageName}' should be an array in localStorage`)
      }
    } catch (error) {
      console.warn(`'${this.storageName}' should be a valid JSON in localStorage`)
    }
  }

  private async fetchAppliance(id: string): Promise<void> {
    const appliance = this.appliances[id]
    for (const aplId of this.appliances[id].aplIds) {
      const url = `${environment.owServerHost}/apl/${aplId}`
      console.log(c(this), `fetchAppliance(${url})`)
      const aplRes = await lastValueFrom(this.httpClient.get<ApplianceResponse>(url))
      console.log(c(this), `fetchAppliance id(${id}), result`, aplRes)
      appliance.aplRes.push(aplRes)
      if (aplRes.appliance === 'shutter') {
        appliance.layout.shutter = true
      }
      if (aplRes.appliance === 'heater') {
        appliance.layout.heater = true
        appliance.mode = (aplRes.devices['PIO'].value || null) as ModeType
      }
    }

    // compute mean temperature
    let sum = 0
    let nbr = 0
    let nan = 0
    for (const res of appliance.aplRes) {
      for (const device of Object.values(res.devices)) {
        if (device.family === 'temperature') {
          appliance.layout.temperature = true
          const val = parseFloat(device.value)
          if (!isNaN(val)) {
            sum += val
            nbr++
          } else {
            nan++
          }
        }
      }
    }
    if (nbr > 0) {
      this.appliances[id].temperature = (sum / nbr).toFixed(1).toString().padStart(4, '0')
    } else if (nan > 0) {
      this.appliances[id].temperature = 'NaN'
    }
    console.log(c(this), `fetchAppliance id(${id}) temp(${this.appliances[id].temperature})`)

  }

  private buildFavoriteAppliances(): void {
    const out: Appliances = {}
    for (const [key, appliance] of Object.entries(this.appliances)) {
      if (this.favoriteIds.includes(key)) {
        out[key] = appliance
      }
    }
    console.log(c(this), `buildAppliances found(${Object.keys(out).length})`)

    this.favoriteAppliances = out
  }
}
