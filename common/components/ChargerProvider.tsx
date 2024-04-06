import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react'
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

  const refresh = useMemo(() => async () => {
    const response = await fetch(`${CHARGER_URL}/`)
    const charger = await response.json()
    setCharger(charger)
  }, [])

  const connect = useMemo(() => async (portId: string, vehicle: Vehicle) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicle: vehicle }),
    })
  }, [])

  const disconnect = useMemo(() => async (portId: string) => {
    await fetch(`${CHARGER_URL}/ports/${portId}/disconnect`, {
      method: 'POST',
    })
  }, [])

  const startSession = useMemo(() => async (portId: string) => {
    await fetch(`${CHARGER_URL}/session/${portId}/start`, {
      method: 'POST',
    })
  }, [])

  const stopSession = useMemo(() => async (portId: string) => {
    await fetch(`${CHARGER_URL}/session/${portId}/stop`, {
      method: 'POST',
    })
  }, [])

  const updateSession = useMemo(() => async (portId: string, state: ChargeState) => {
    console.log('updateSession', portId, state)
    await fetch(`${CHARGER_URL}/session/${portId}/state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chargeState: state })
    })
  }, [])

  if (!charger) return <div>Loading...</div>

  return (
    <ChargeContext.Provider value={{ charger, refresh, connect, disconnect, startSession, stopSession, updateSession }}>
      {children}
    </ChargeContext.Provider>
  )
}
