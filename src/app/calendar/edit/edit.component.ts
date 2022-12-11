import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { c } from 'src/app/console'
import { CalendarService, Cron } from '../calendar.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: string
  cron$: Observable<Cron>

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || 'edit'
    console.log(c(this), `constructor route id(${this.id})`)
    this.cron$ = this.calendarService.getCron(this.id)
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.router.navigate(['calendar'])
  }
}
