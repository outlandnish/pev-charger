import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Charger } from '@charger/common'
import { ChargeContext } from './ChargerContext'

const CHARGER_URL = 'http://localhost:3000'

export const ChargerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [charger, setCharger] = useState<Charger | undefined>(undefined)

  useEffect(() => {
    const loadCharger = async () => {
      const response = await fetch(`${CHARGER_URL}/`)
      const charger = await response.json()
      setCharger(charger)
    }

    loadCharger()
  }, [])

  const refresh = async () => {
    const response = await fetch(`${CHARGER_URL}/`)
    const charger = await response.json()
    setCharger(charger)
  }

  if (!charger) return <div>Loading...</div>

  return (
    <ChargeContext.Provider value={{ charger, refresh }}>
      {children}
    </ChargeContext.Provider>
  )
}
