import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HeaterComponent } from './heater/heater.component'
import { HomeComponent } from './home/home.component'
import { TemperatureComponent } from './temperature/temperature.component'
import { ShutterComponent } from './shutter/shutter.component'
import { CalendarComponent } from './calendar/calendar.component'
import { LinkyComponent } from './linky/linky.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginPageComponent } from './auth/login-page/login-page.component'
import { environment } from '../environments/environment'
import { LogoutPageComponent } from './auth/logout-page/logout-page.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'temperature', component: TemperatureComponent, canActivate: [AuthGuard] },
  { path: 'shutter', component: ShutterComponent, canActivate: [AuthGuard] },
  { path: 'heater', component: HeaterComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'linky', component: LinkyComponent, canActivate: [AuthGuard] },

  {
    path: 'login', component: LoginPageComponent, data: {
      key: 'i', desc: 'login', loginPage: {
        title: 'Bienvenue sur',
        subTitle: 'djinn@home',
        version: environment.version,
        redirect: '/',
      }
    }
  },
  {
    path: 'logout', component: LogoutPageComponent, data: {
      key: 'o', desc: 'logout', logoutPage: {
        title: 'Bienvenue sur',
        subTitle: 'djinn@home',
        version: environment.version,
        redirect: '/'
      }
    }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
