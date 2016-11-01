import { Injectable } from '@angular/core';

export class Measure {
  type: string;
  code: string;
}

export class Appliance {
  id: string;
  title: string;
  measures?: Array<Measure>;
  action?: string;
}


@Injectable()
export class ApplianceService {

  public appliances: any;
  constructor() {
    this.appliances = {
      sensors: [
        { id: 'X1', title: 'Extérieur', measures: [{ code: 'X1', type: 'temp' }] },
        { id: 'C1P', title: 'Cuisine', measures: [{ code: 'C1P', type: 'temp' }] },
        { id: 'U1', title: 'Bureau', measures: [{ code: 'U1', type: 'temp' }] },
        { id: 'J1P', title: 'Séjour', measures: [{ code: 'J1P', type: 'temp' }] },
        {
          id: 'R1', title: 'Salle de bain Parent', measures: [
            { code: 'R1', type: 'hum' },
            { code: 'R1', type: 'temp' }
          ]
        },
        {
          id: 'H1', title: 'Salle de bain Enfant', measures: [
            { code: 'H1', type: 'hum' },
            { code: 'H1', type: 'temp' }
          ]
        },
        { id: 'A1', title: 'Chambre Amandine', measures: [{ code: 'A1', type: 'temp' }] },
        { id: 'M1', title: 'Chambre Maureen', measures: [{ code: 'A1', type: 'temp' }] },
        { id: 'B1', title: 'Buanderie', measures: [{ code: 'B1', type: 'temp' }] },
        {
          id: 'G1V', title: 'Garage VMC', measures: [
            { code: 'G1P', type: 'temp' },
            { code: 'G1T', type: 'temp' },
            { code: 'G1E', type: 'temp' },
            { code: 'G1I', type: 'temp' },
          ]
        },
      ],
      shutters: [
        { id: 'all', title: 'Maison', action: 'shutter' },
        { id: 'CR', title: 'Cuisine', action: 'shutter' },
        { id: 'UR', title: 'Bureau', action: 'shutter' },
        { id: 'SR', title: 'Salon', action: 'shutter' },
        { id: 'JRP', title: 'Séjour Porte', action: 'shutter' },
        { id: 'JRS', title: 'Séjour Sud', action: 'shutter' },
        { id: 'JRE', title: 'Séjour Est', action: 'shutter' },
        { id: 'MR', title: 'Chambre Maureen', action: 'shutter' },
        { id: 'AR', title: 'Chambre Amandine', action: 'shutter' },
        { id: 'PR', title: 'Chambre Parent', action: 'shutter' },
      ],
      heaters: [
        { id: 'all', title: 'Maison', action: 'heater' },
        { id: 'S', title: 'Cuisine', action: 'heater' },
        { id: 'P', title: 'Chambre Parent', action: 'heater' },
        { id: 'M', title: 'Chambre Maureen', action: 'heater' },
        { id: 'A', title: 'Chambre Amandine', action: 'heater' },
        { id: 'R', title: 'Salle de bain Parent', action: 'heater' },
        { id: 'H', title: 'Salle de bain Enfant', action: 'heater' },
      ],
      t1fos: [
        { id: 'HCHC', title: 'Heure Creuse (Wh)', measures: [{ code: 'HCHC', type: 't1fo' }] },
        { id: 'HCHP', title: 'Heure Pleine (Wh)', measures: [{ code: 'HCHP', type: 't1fo' }] },
        { id: 'IINST', title: 'Intensite Instantanee (a)', measures: [{ code: 'IINST', type: 't1fo' }] },
        { id: 'PAPP', title: 'Puissance Apparente (Va)', measures: [{ code: 'PAPP', type: 't1fo' }] },
      ]
    };
  }
}
