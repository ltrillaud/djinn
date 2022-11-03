import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mainMenus = environment.mainMenus.filter(menu => menu.page !== 'home')

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onGoto(page: string) {
    this.router.navigate([page])
  }

}
