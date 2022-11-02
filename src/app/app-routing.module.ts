import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HeaterComponent } from './heater/heater.component'
import { HomeComponent } from './home/home.component'
import { TemperatureComponent } from './temperature/temperature.component'
import { ShutterComponent } from './shutter/shutter.component'
import { CalendarComponent } from './calendar/calendar.component'
import { LinkyComponent } from './linky/linky.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'temperature', component: TemperatureComponent },
  { path: 'shutter', component: ShutterComponent },
  { path: 'heater', component: HeaterComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'linky', component: LinkyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
