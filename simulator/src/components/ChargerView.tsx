import { useEffect } from 'react'
import { useCharger } from '@charger/common'

export const ChargerView = () => {
  const { charger, refresh: refreshCharger } = useCharger()

  useEffect(() => {
    setInterval(() => refreshCharger(), 500)
  })

  return (
    <>
      <h1 className="text-3xl font-bold underline">{charger.name}</h1>
      <p>
        {charger.availableCapacity} / {charger.capacity} watts
      </p>
      <ul>
        {charger.ports.map((port) => (
          <li key={port.id}>
            <div></div>
          </li>
        ))}
      </ul>
    </>
  )
}
