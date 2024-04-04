import { Charger } from '@charger/common'
import { createContext } from 'react'

interface ChargeContextType {
  charger?: Charger
}

export const ChargeContext = createContext({} as ChargeContextType)
