import { useCharger } from '../hooks/useCharger'

export const ChargerView = () => {
  const charger = useCharger()

  return (
    <>
      <h1>{charger.name}</h1>
      <p>{charger.capacity} watts</p>
      <ul>
        {charger.ports.map((port) => (
          <li key={port.id}>{port.available ? 'Available' : 'Occupied'}</li>
        ))}
      </ul>
    </>
  )
}
