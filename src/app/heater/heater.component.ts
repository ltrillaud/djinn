import { Component, OnInit } from '@angular/core';

type HeaterType = 'S' | 'R' | 'A' | 'M' | 'P'
interface Heater {
  key: HeaterType
  label: {
    line1: string
    line2: string
  }
}

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.scss']
})
export class HeaterComponent implements OnInit {
  heaters: Heater[] = [
    { key: 'S', label: { line1: 'Salon et', line2: 'Séjour' } },
    { key: 'P', label: { line1: 'Chambre', line2: 'Parentale' } },
    { key: 'M', label: { line1: 'Chambre', line2: 'Maureen' } },
    { key: 'A', label: { line1: 'Chambre', line2: 'Amandine' } },
    { key: 'R', label: { line1: 'Salle de', line2: 'bain' } },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
