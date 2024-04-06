import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { ChargeState, Charger, Vehicle } from '@charger/common'
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

  const connect = async (portId: string, vehicle: Vehicle) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })
  }

  const disconnect = async (portId: string) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/disconnect`, {
      method: 'POST',
    })
  }

  const startSession = async (portId: string) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/start`, {
      method: 'POST',
    })
  }

  const stopSession = async (portId: string) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/stop`, {
      method: 'POST',
    })
  }

  const updateSession = async (portId: string, sessionId: string, state: ChargeState) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/sessions/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    })
  }

  if (!charger) return <div>Loading...</div>

  return (
    <ChargeContext.Provider value={{ charger, refresh, connect, disconnect, startSession, stopSession, updateSession }}>
      {children}
    </ChargeContext.Provider>
  )
}
