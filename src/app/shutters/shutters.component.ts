import { Component, OnInit } from '@angular/core';
import { ApplianceService } from '../appliance.service';

@Component({
  selector: 'app-shutters',
  templateUrl: './shutters.component.html',
  styleUrls: ['./shutters.component.scss'],
  providers: [ApplianceService]
})
export class ShuttersComponent implements OnInit {

  constructor(private applianceService: ApplianceService) { }

  ngOnInit() {
  }

}
