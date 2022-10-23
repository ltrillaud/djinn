import { Component, OnInit } from '@angular/core';
import { ApplianceService } from '../appliance.service';

@Component({
  selector: 'app-t1fos',
  templateUrl: './t1fos.component.html',
  styleUrls: ['./t1fos.component.scss'],
  providers: [ApplianceService]
})
export class T1fosComponent implements OnInit {

  constructor(private applianceService: ApplianceService) { }

  ngOnInit() {
  }

}
