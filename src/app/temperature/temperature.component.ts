import { Component, OnInit } from '@angular/core';


interface Temperature {
  key: string
  label: {
    line1: string
    line2: string
  }
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  temperatures: Temperature[] = [
    { key: 'J1P', label: { line1: 'Séjour', line2: '' } },
    { key: 'C1P', label: { line1: 'Cuisine', line2: '' } },
    { key: 'U1', label: { line1: 'Bureau', line2: '' } },
    { key: 'M1', label: { line1: 'Chambre', line2: 'Maureen' } },
    { key: 'A1', label: { line1: 'Chambre', line2: 'Amandine' } },
    { key: 'B1', label: { line1: 'Buanderie', line2: '' } },
    { key: 'X1', label: { line1: 'Extérieur', line2: '' } },
    { key: 'R1', label: { line1: 'Salle de', line2: 'Bain Bas' } },
    { key: 'H1', label: { line1: 'Salle de', line2: 'Bain Haut' } },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
