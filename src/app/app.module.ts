import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
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
import { JwtInterceptor } from './auth/jwt.interceptor'
import { SsoService, SSO_CONFIG_NAME_TOKEN, SSO_DOMAIN_NAME_TOKEN } from './auth/sso.service'
import { SERVICE_PROVIDER_NAME_TOKEN } from './auth/auth.service'
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular'
import { initializeSso } from './auth/sso.factory'
import { environment } from '../environments/environment'
import { LoginDlgComponent } from './auth/login-dlg/login-dlg.component'
import { LoginPageComponent } from './auth/login-page/login-page.component'
import { LogoutDlgComponent } from './auth/logout-dlg/logout-dlg.component'
import { LogoutPageComponent } from './auth/logout-page/logout-page.component'
import { EditComponent } from './calendar/edit/edit.component'
import { WeatherComponent } from './weather/weather.component'

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
    LoginDlgComponent,
    LoginPageComponent,
    LogoutDlgComponent,
    LogoutPageComponent,
    EditComponent,
    WeatherComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: JwtInterceptor },
    { provide: SSO_CONFIG_NAME_TOKEN, useValue: environment.bypassSsoConfig },
    { provide: SSO_DOMAIN_NAME_TOKEN, useValue: environment.bypassSsoDomain },
    { provide: SERVICE_PROVIDER_NAME_TOKEN, useValue: environment.serviceProviderName },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeSso,
      deps: [KeycloakService, SsoService, SSO_CONFIG_NAME_TOKEN, SSO_DOMAIN_NAME_TOKEN],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
