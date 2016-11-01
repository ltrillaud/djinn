import { Component, OnInit, Input } from '@angular/core';
import { Appliance} from '../appliance.service';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() appliance: Appliance;

  constructor() {
  }

  ngOnInit() {
    console.log('PanelComponent ', this.appliance);

  }

}
