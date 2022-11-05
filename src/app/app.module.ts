import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { HeaterComponent } from './heater/heater.component'
import { TemperatureComponent } from './temperature/temperature.component'
import { ShutterComponent } from './shutter/shutter.component'
import { CalendarComponent } from './calendar/calendar.component'
import { LinkyComponent } from './linky/linky.component'
import { AppliancesComponent } from './widgets/appliances/appliances.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaterComponent,
    TemperatureComponent,
    ShutterComponent,
    CalendarComponent,
    LinkyComponent,
    AppliancesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
