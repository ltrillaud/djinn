import { Component } from '@angular/core'
import { Router } from '@angular/router'

interface Menu {
  label: string
  icon: string
  page: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menus: Menu[] = [
    { label: 'Accueil', icon: 'home', page: 'home' },
    { label: 'Température', icon: 'thermostat', page: 'temperature' },
    { label: 'Volet Roulant', icon: 'blinds', page: 'shutter' },
    { label: 'Chauffage', icon: 'nest_true_radiant', page: 'heater' },
    { label: 'Programmation', icon: 'edit_calendar', page: 'calendar' },
    { label: 'Linky', icon: 'cable', page: 'linky' },
  ]

  constructor(
    private router: Router,
  ) { }

  onGoto(page: string) {
    this.router.navigate([page])
  }
}
