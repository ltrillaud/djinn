import { Appliance } from "src/app/appliances.service"

export interface Menu {
  label: string
  icon: string
  page: string
}

export interface Environment {
  production: boolean
  owServerHost: string
  mainMenus: Menu[]
  appliances: Appliance[]
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
  appliances: [],
}