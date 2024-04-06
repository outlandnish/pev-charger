import { ChargeState, Charger, Vehicle } from '@charger/common'
import { createContext } from 'react'

interface ChargeContextType {
  charger: Charger
  refresh: () => void
  connect: (portId: string, vehicle: Vehicle) => void
  disconnect: (portId: string) => void
  startSession: (portId: string) => void
  stopSession: (portId: string) => void
  updateSession: (portId: string, sessionId: string, state: ChargeState) => void
}

export const ChargeContext = createContext({} as ChargeContextType)
