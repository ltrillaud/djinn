import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { c } from '../console'

export type HeaterActionType = 'E' | '1' | '2' | 'C'
export type ShutterActionType = 'O' | 'C'

export type Recurrence = number | Range | string
export type RecurrenceSegment = Recurrence | Recurrence[]

export interface RecurrenceSpecObjLit {
  date?: RecurrenceSegment | undefined
  dayOfWeek?: RecurrenceSegment | undefined
  hour?: RecurrenceSegment | undefined
  minute?: RecurrenceSegment | undefined
  month?: RecurrenceSegment | undefined
  second?: RecurrenceSegment | undefined
  year?: RecurrenceSegment | undefined
  tz?: string | undefined
}

export type SunStep =
  | 'nightEnd' //      06:27 morning astronomical twilight starts
  | 'nauticalDawn' //  07:04 morning nautical twilight starts
  | 'dawn' //          07:42 morning nautical twilight ends, morning civil twilight starts *
  | 'sunrise' //       08:17 top edge of the sun appears on the horizon
  | 'sunriseEnd' //    08:20 bottom edge of the sun touches the horizon
  | 'goldenHourEnd' // 09:06 soft light, best time for photography ends
  | 'solarNoon' //     12:49 sun is in the highest position
  | 'goldenHour' //    16:32 evening golden hour starts
  | 'sunsetStart' //   17:18 bottom edge of the sun touches the horizon
  | 'sunset' //        17:22 sun disappears below the horizon, evening civil twilight starts
  | 'dusk' //          17:56 evening nautical twilight starts
  | 'nauticalDusk' //  18:34 evening astronomical twilight starts
  | 'night' //         19:11 dark enough for astronomical observations
  | 'nadir' //         00:49 darkest moment of the night, sun is in the lowest position
  | 'none' //          --:-- mark to don't use sunStep

export interface Schedule extends RecurrenceSpecObjLit {
  sunStep: SunStep
}

export interface Action {
  apl: string
  value: HeaterActionType | ShutterActionType
}
export interface Cron {
  schedule: Schedule
  actions: Action[]
}

export type CronResponse = { [key: string]: Cron }

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  cron$: Observable<CronResponse>
  crons: CronResponse = {}

  constructor(
    private httpClient: HttpClient,
  ) {
    this.cron$ = this.httpClient.get<CronResponse>(`${environment.owServerHost}/cron`).pipe(
      tap(crons => {
        console.log(c(this), `getCrons done #${Object.keys(this.crons).length}`)

        this.crons = crons
      })
    )
  }

  getCron(id: string): Observable<Cron> {
    return this.httpClient.get<Cron>(`${environment.owServerHost}/cron/${id}`)
  }
}
