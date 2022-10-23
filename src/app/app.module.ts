import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ShuttersComponent } from './shutters/shutters.component';
import { HeatersComponent } from './heaters/heaters.component';
import { T1fosComponent } from './t1fos/t1fos.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    ShuttersComponent,
    HeatersComponent,
    T1fosComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'sensors', pathMatch: 'full' },
      { path: 'sensors', component: SensorsComponent },
      { path: 'shutters', component: ShuttersComponent },
      { path: 'heaters', component: HeatersComponent },
      { path: 't1fos', component: T1fosComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
