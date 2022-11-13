import { Appliance, Appliances } from "src/app/appliances.model"
import { TServiceProvider } from "src/app/auth/auth.service"

import pack from '../../package.json'
export interface Menu {
  label: string
  icon: string
  page: string
}

export interface Environment {
  production: boolean
  version: string
  owServerHost: string
  mainMenus: Menu[]
  appliances: Appliances
  serviceProviderName: TServiceProvider
  bypassSsoConfig: string
  bypassSsoDomain: string
}

export const defaultEnvironment: Environment = {
  production: true,
  version: pack.version,
  serviceProviderName: 'djinn',
  bypassSsoConfig: '',
  bypassSsoDomain: '',
  owServerHost: 'https://owfs.trillaud.com',
  mainMenus: [
    { label: 'Accueil', icon: 'home', page: 'home' },
    { label: 'Température', icon: 'thermostat', page: 'temperature' },
    { label: 'Volet Roulant', icon: 'blinds', page: 'shutter' },
    { label: 'Chauffage', icon: 'nest_true_radiant', page: 'heater' },
    { label: 'Programmation', icon: 'event_note', page: 'calendar' },
    { label: 'Linky', icon: 'cable', page: 'linky' },
    { label: 'Déconnexion', icon: 'power_settings_new', page: 'logout' },
  ],
  appliances: {
    // heater : Indiv
    S: new Appliance(
      ['S', 'J1P', 'C1P', 'U1'],
      { line1: 'Living', line2: 'Room' },
    ),
    P: new Appliance(
      ['P' /*,'P1'*/],
      { line1: 'Chambre', line2: 'Parentale' },
    ),
    M: new Appliance(
      ['M', 'M1'],
      { line1: 'Chambre', line2: 'Maureen' },
    ),
    A: new Appliance(
      ['A', 'A1'],
      { line1: 'Chambre', line2: 'Amandine' },
    ),
    R: new Appliance(
      ['R', 'R1'],
      { line1: 'Salle de ', line2: 'Bain' },
    ),

    // temperatures : Group
    livingRoom: new Appliance(
      ['J1P', 'C1P', 'U1'],
      { line1: 'Living', line2: 'Room' },
      'all',
    ),
    haut: new Appliance(
      ['M1', 'A1'],
      { line1: 'Étage', line2: '' },
      'all',
    ),

    // temperatures : Indiv
    J1P: new Appliance(
      ['J1P'],
      { line1: 'Séjour', line2: '' },
    ),
    C1P: new Appliance(
      ['C1P'],
      { line1: 'Cuisine', line2: '' },
    ),
    U1: new Appliance(
      ['U1'],
      { line1: 'Bureau', line2: '' },
    ),
    P1: new Appliance(
      ['P1'],
      { line1: 'Chambre', line2: 'Parentale' },
    ),
    M1: new Appliance(
      ['M1'],
      { line1: 'Chambre', line2: 'Maureen' },
    ),
    A1: new Appliance(
      ['A1'],
      { line1: 'Chambre', line2: 'Amandine' },
    ),
    B1: new Appliance(
      ['B1'],
      { line1: 'Buanderie', line2: '' },
    ),
    X1: new Appliance(
      ['X1'],
      { line1: 'Extérieur', line2: '' },
    ),
    R1: new Appliance(
      ['R1'],
      { line1: 'Salle de', line2: 'Bain Bas' },
    ),
    H1: new Appliance(
      ['H1'],
      { line1: 'Salle de', line2: 'Bain Haut' },
    ),
    // Shutters : Groups
    boulot: new Appliance(
      ['UR', 'SR', 'CR'],
      { line1: 'Boulot', line2: '' },
      'all',
    ),
    reveil: new Appliance(
      ['JRP', 'JRS', 'JRE', 'PR'],
      { line1: 'Réveil', line2: '' },
      'all',
    ),
    etage: new Appliance(
      ['AR', 'MR'],
      { line1: 'Étage', line2: '' },
      'all',
    ),

    // Shutters
    UR: new Appliance(
      ['UR'],
      { line1: 'Bureau', line2: '' },
    ),
    CR: new Appliance(
      ['CR'],
      { line1: 'Cuisine', line2: '' },
    ),
    SR: new Appliance(
      ['SR'],
      { line1: 'Salon', line2: '' },
    ),
    JRP: new Appliance(
      ['JRP'],
      { line1: 'Séjour', line2: 'Porte' },
    ),
    JRS: new Appliance(
      ['JRS'],
      { line1: 'Séjour', line2: 'Sud' },
    ),
    JRE: new Appliance(
      ['JRE'],
      { line1: 'Séjour', line2: 'Est' },
    ),
    PR: new Appliance(
      ['PR'],
      { line1: 'Chambre', line2: 'Parentale' },
    ),
    MR: new Appliance(
      ['MR'],
      { line1: 'Chambre', line2: 'Maureen' },
    ),
    AR: new Appliance(
      ['AR'],
      { line1: 'Chambre', line2: 'Amandine' },
    ),
  },
}