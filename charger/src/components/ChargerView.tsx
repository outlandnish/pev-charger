import { useEffect } from 'react'
import { useCharger } from '@charger/common'
import { PortListView } from './PortListView'

export const ChargerView = () => {
  const { charger, refresh: refreshCharger } = useCharger()

  useEffect(() => {
    const interval = setInterval(() => refreshCharger(), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [refreshCharger])

  return (
    <>
      <h1 className="text-3xl font-bold underline">{charger.name}</h1>
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
    </>
  )
}
