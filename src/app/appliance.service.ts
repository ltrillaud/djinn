import { Injectable } from '@angular/core';

export class Appliance {
  id: string;
  title: string;
}


@Injectable()
export class ApplianceService {

  public appliances: any;
  constructor() {
    this.appliances = {
      sensors: [
        {
          title: 'Extérieur',
          id: 'X1'
        },
        {
          title: 'Cuisine',
          id: 'C1P'
        }
      ],
      shutters: [

      ],
      heaters: [

      ],
      t1fos: [

      ]
    };
  }
}
