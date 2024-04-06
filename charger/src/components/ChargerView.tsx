import { useEffect } from 'react'
import { useCharger } from '../hooks/useCharger'

export const ChargerView = () => {
  const { charger, refresh: refreshCharger } = useCharger()
  
  useEffect(() => {
    setInterval(() => refreshCharger(), 500)
  })

  return (
    <>
      <h1>{charger.name}</h1>
      <p>{charger.availableCapacity} / {charger.capacity} watts</p>
      <ul>
        {charger.ports.map((port) => (
          <li key={port.id}>{port.available ? 'Available' : 'Occupied'}</li>
        ))}
      </ul>
    </>
  )
}
