import { ChargeSession, ChargeState, useCharger } from '@charger/common'
import { FC } from 'react'

interface Props {
  portId: string
  sessionId: string
  chargeSession: ChargeSession
}

export const ChargeSessionSimulator: FC<Props> = ({
  portId,
  sessionId,
  chargeSession
}) => {
  const { updateSession } = useCharger()

  switch (chargeSession.chargeState) {
    default:
      return (
        <>
          {ChargeState.options.map((option) => (
            <button key={option} onClick={() => updateSession(portId, option)}>
              Set State: {option}
            </button>
          ))}
        </>
      )
  }
}
