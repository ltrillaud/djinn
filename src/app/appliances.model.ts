export type FamilyType = 'temperature' | 'humudity' | 'PIO'
export type LayoutType = 'temperature' | 'shutter' | 'heater'
export type ModeType = 'O' | 'C' | '1' | '2' | 'E' | null

export interface DeviceReadResponse {
  value: string
  family: FamilyType
}

export interface ApplianceResponse {
  appliance: string
  devices: { [key: string]: DeviceReadResponse }
}

export class Appliance {
  isFavorite: boolean = false
  iconId: string = ''
  aplRes: ApplianceResponse[] = []
  temperature: string = ''
  layout: { [key in LayoutType]: boolean } = {
    temperature: false,
    shutter: false,
    heater: false,
  }
  mode: ModeType = null

  constructor(
    public aplIds: string[],
    public label: { line1: string; line2: string },
    iconId?: string
  ) {
    this.iconId = iconId || aplIds[0] || ''
  }
}

export interface Appliances { [index: string]: Appliance }