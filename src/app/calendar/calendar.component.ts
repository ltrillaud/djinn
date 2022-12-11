import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AppliancesService } from '../appliances.service'
import { CalendarService, CronResponse } from './calendar.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  crons: Observable<CronResponse>
  constructor(
    public appliancesService: AppliancesService,
    private router: Router,
    private calendarService: CalendarService,
  ) {
    this.crons = this.calendarService.cron$
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.router.navigate(['calendar', 'edit'])
  }

  onEdit(id: string) {
    this.router.navigate(['calendar', id])
  }

  unsorted(): number { return 0 }
}
