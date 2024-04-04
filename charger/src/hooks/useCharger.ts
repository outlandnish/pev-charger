import { useContext } from 'react'
import { ChargeContext } from '../components/ChargerContext'

export const useCharger = () => {
  const context = useContext(ChargeContext)
  if (!context.charger)
    throw new Error('useCharger must be used within a ChargerProvider')

  return context.charger
}
