import { ChargerPort } from '@charger/common'

declare module 'express-serve-static-core' {
  export interface Request {
    port?: ChargerPort
  }
}
