import { Component, OnInit } from '@angular/core';
import { ApplianceService } from '../appliance.service';

@Component({
  selector: 'app-heaters',
  templateUrl: './heaters.component.html',
  styleUrls: ['./heaters.component.scss']
  providers: [ApplianceService]
})
export class HeatersComponent implements OnInit {

  constructor(private applianceService: ApplianceService) { }

  ngOnInit() {
  }

}
