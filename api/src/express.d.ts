import { ChargerPort } from './types'

declare module 'express-serve-static-core' {
  export interface Request {
    port?: ChargerPort
  }
}
