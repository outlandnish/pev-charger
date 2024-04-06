import { ChargerPort, Vehicle, useCharger } from '@charger/common'
import { FC, useState } from 'react'
import { vehicles } from '../data/vehicles'
import { ChargeSessionSimulator } from './ChargeSessionSimulator'

interface Props {
  port: ChargerPort
  index: number
}

export const PortListView: FC<Props> = ({ port, index }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    port.vehicle
  )
  const { connect, disconnect } = useCharger()

  const onVehicleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleId = event.target.value
    setSelectedVehicle(vehicles.find((vehicle) => vehicle.id === vehicleId))
  }

  return (
    <div>
      <h3>Port {index + 1}</h3>
      {port.available && (
        <select onChange={onVehicleSelected}>
          <option value="">Select a vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name}
            </option>
          ))}
        </select>
      )}
      {port.available && selectedVehicle && (
        <button onClick={() => connect(port.id, selectedVehicle)}>
          Connect
        </button>
      )}
      {port.vehicle && <p>Connected - {port.vehicle.name}</p>}
      {port.chargeSession && (
        <ChargeSessionSimulator
          chargeSession={port.chargeSession}
          portId={port.id}
        />
      )}
      {port.vehicle && (
        <button onClick={() => disconnect(port.id)}>Disconnect</button>
      )}
    </div>
  )
}
