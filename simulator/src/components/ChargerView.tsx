import { useEffect } from 'react'
import { useCharger } from '@charger/common'
import { PortListView } from './PortListView'

export const ChargerView = () => {
  const { charger, refresh: refreshCharger } = useCharger()

  useEffect(() => {
    const interval = setInterval(() => refreshCharger(), 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">{charger.name}</h1>
      <p>
        {charger.availableCapacity} / {charger.capacity} watts
      </p>
      <ul>
        {charger.ports.map((port, index) => (
          <li key={port.id}>
            <PortListView port={port} index={index} />
          </li>
        ))}
      </ul>
    </div>
  )
}
