import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { environment } from "../../environments/environment"
import { Appliances } from '../appliances.model'
import { AppliancesService } from '../appliances.service'
import { c } from '../console'

interface Forecast {
  dt: number
  date: Date
  clouds: {
    all: number
  }
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  wind: {
    deg: number
    gust: number
    speed: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
}

interface Slice {
  hour: number
  forecast?: Forecast
}

interface Day {
  date: Date
  slices: Slice[]
}

interface Weather {
  city: any
  cnt: number
  cod: string
  message: number
  list: Forecast[]
  days: Day[]
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  math = Math
  weather?: Weather
  applianceIds: string[] = ['G1', 'X1']
  appliances: Appliances = {}
  parseFloat = parseFloat

  constructor(
    private httpClient: HttpClient,
    public appliancesService: AppliancesService,
  ) {
    // filter appliance for this page
    for (const [key, appliance] of Object.entries(this.appliancesService.appliances)) {
      if (this.applianceIds.includes(key)) {
        this.appliances[key] = appliance
      }
    }
  }

  async ngOnInit(): Promise<void> {
    // then update the appliances
    Object.keys(this.appliances).map((key) => {
      this.appliancesService.fetchAppliance(key)
    })

    const url = `${environment.owServerHost}/weather/`
    // const url = '/assets/response.json'
    this.weather = await firstValueFrom(this.httpClient.get<Weather>(url))
    const now = new Date()

    // guess the next daylight
    this.weather.days = []

    // guess the first day
    const isoDate = now.toISOString().substring(0, 10)
    let firstUtcDate = new Date(isoDate + 'T00:00:00.000Z')
    if (now.getUTCHours() > 21) { // get tomorrow
      firstUtcDate.setUTCDate(firstUtcDate.getUTCDate() + 1)
    } // keep today
    console.log(`     weatherComp.ts now(${now.toISOString()}) first(${firstUtcDate.toISOString()})`)

    // guess the first forecast index
    const firstTimeStamp = new Date(isoDate + 'T06:00:00.000Z').getTime() / 1000
    console.log(`fisrt`, firstTimeStamp)
    const firstForcastIndex = this.weather.list.findIndex((forecast) => forecast.dt >= firstTimeStamp)
    if (firstForcastIndex === -1) {
      console.log(`No forecast`)
    }

    // fill the days slices
    let forecastIndex = firstForcastIndex
    let forecastDate = firstUtcDate
    for (let dayIdx = 0; dayIdx < 2; dayIdx++) {
      const day: Day = {
        date: new Date(forecastDate.toISOString()),
        slices: [],
      }

      for (let sliceIdx = 0; sliceIdx < 5; sliceIdx++) {
        const hours = (sliceIdx * 3 + 6).toString().padStart(2, '0')
        const sliceDate = new Date(day.date.toISOString().substring(0, 10) + `T${hours}:00:00.000Z`)
        const sliceDt = sliceDate.getTime() / 1000
        const slice: Slice = { hour: sliceDate.getHours() }
        slice.forecast = this.weather?.list.find(item => item.dt === sliceDt)
        if (slice.forecast?.weather[0].description) {
          slice.forecast.weather[0].description = slice.forecast?.weather[0].description.replace('partiellement', 'partiel.')
        }
        day.slices.push(slice)
      }
      this.weather.days.push(day)
      forecastDate.setUTCDate(forecastDate.getUTCDate() + 1)
      forecastIndex += 8
    }
  }

}
