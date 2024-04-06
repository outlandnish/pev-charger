import { useContext } from 'react'
import { ChargeContext } from '../components/ChargerContext'

export const useCharger = () => {
  const context = useContext(ChargeContext)
  return context
}
