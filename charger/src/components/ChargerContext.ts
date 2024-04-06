import { Charger } from '@charger/common'
import { createContext } from 'react'

interface ChargeContextType {
  charger: Charger
  refresh: () => void
}

export const ChargeContext = createContext({} as ChargeContextType)
