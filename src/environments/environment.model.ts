import { Appliance, Appliances } from "src/app/appliances.service"

export interface Menu {
  label: string
  icon: string
  page: string
}

export interface Environment {
  production: boolean
  owServerHost: string
  mainMenus: Menu[]
  appliances: Appliances
}

export const defaultEnvironment: Environment = {
  production: true,
  owServerHost: 'https://192.168.1.1:8001',
  mainMenus: [
    { label: 'Accueil', icon: 'home', page: 'home' },
    { label: 'Température', icon: 'thermostat', page: 'temperature' },
    { label: 'Volet Roulant', icon: 'blinds', page: 'shutter' },
    { label: 'Chauffage', icon: 'nest_true_radiant', page: 'heater' },
    { label: 'Programmation', icon: 'edit_calendar', page: 'calendar' },
    { label: 'Linky', icon: 'cable', page: 'linky' },
  ],
  appliances: {
    J1P: { isFavorite: false, label: { line1: 'Séjour', line2: '' } },
    C1P: { isFavorite: false, label: { line1: 'Cuisine', line2: '' } },
    U1: { isFavorite: false, label: { line1: 'Bureau', line2: '' } },
    M1: { isFavorite: false, label: { line1: 'Chambre', line2: 'Maureen' } },
    A1: { isFavorite: false, label: { line1: 'Chambre', line2: 'Amandine' } },
    B1: { isFavorite: false, label: { line1: 'Buanderie', line2: '' } },
    X1: { isFavorite: false, label: { line1: 'Extérieur', line2: '' } },
    R1: { isFavorite: false, label: { line1: 'Salle de', line2: 'Bain Bas' } },
    H1: { isFavorite: false, label: { line1: 'Salle de', line2: 'Bain Haut' } },
  },
}