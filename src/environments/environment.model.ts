export interface Environment {
  production: boolean
  owServerHost: string
}

export const defaultEnvironment: Environment = {
  production: true,
  owServerHost: 'https://192.168.1.1:8001',
}