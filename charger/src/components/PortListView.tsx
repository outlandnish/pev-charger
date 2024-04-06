import { ChargeSession, ChargerPort, useCharger } from '@charger/common'
import { FC } from 'react'

interface Props {
  port: ChargerPort
  index: number
}

interface ConnectedPortProps {
  port: ChargerPort
}

interface ChargeSessionOverviewProps {
  portId: string
  session: ChargeSession
}

const ChargeSessionOverview: FC<ChargeSessionOverviewProps> = ({
  portId,
  session
}) => {
  const { stopSession } = useCharger()
  return (
    <div>
      <span>Charge session in progress</span>
      <span>{session.chargeState}</span>
      <button onClick={() => stopSession(portId)}>Stop Session</button>
    </div>
  )
}

const ConnectedPort: FC<ConnectedPortProps> = ({ port }) => {
  const { startSession } = useCharger()
  if (!port.vehicle) return null

  return (
    <div>
      <h2>Connected</h2>
      <h3>{port.vehicle.name}</h3>

      {!port.chargeSession && (
        <button onClick={() => startSession(port.id)}>Start Charging</button>
      )}
      {port.chargeSession && (
        <ChargeSessionOverview portId={port.id} session={port.chargeSession} />
      )}
    </div>
  )
}

export const PortListView: FC<Props> = ({ port, index }) => {
  return (
    <div>
      <h3>Port {index + 1}</h3>
      {port.available && <h2>Available</h2>}
      {port.vehicle && <ConnectedPort port={port} />}
    </div>
  )
}
