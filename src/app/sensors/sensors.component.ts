import { Component, OnInit } from '@angular/core';
import { ApplianceService } from '../appliance.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
  providers: [ApplianceService]
})
export class SensorsComponent implements OnInit {

  constructor(private applianceService: ApplianceService) { }

  ngOnInit() {
  }

}
