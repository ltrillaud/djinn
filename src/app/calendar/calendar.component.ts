import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    public appliancesService: AppliancesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.router.navigate(['calendar', 'edit'])
  }
}
