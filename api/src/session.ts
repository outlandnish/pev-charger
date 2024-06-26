import express, { Request, Response } from 'express'
import {
  ChargeSession,
  StartSessionRequest,
  StopSessionRequest,
  UpdateChargeStateRequest
} from '@charger/common'
import { findPort, validate } from './middleware.js'
import { charger, updateChargeSessions } from './charger.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const sessions = Array<ChargeSession>()

router.post(
  '/:portId/start',
  validate(StartSessionRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    if (port.available || !port.vehicle)
      return res.status(400).json({ error: 'No vehicle connected' })
    else {
      port.chargeSession = {
        id: uuidv4(),
        chargerId: charger.id,
        portId: port.id,
        vehicle: port.vehicle,
        startTime: new Date(),
        chargeState: 'idle'
      }

      return res.json({ session: port.chargeSession })
    }
  }
)

router.post(
  '/:portId/stop',
  validate(StopSessionRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    if (port.available || !port.vehicle)
      return res.status(400).json({ error: 'Port is not in use' })
    else {
      port.chargeSession.endTime = new Date()
      port.chargeSession.endReason = req.body.reason
      port.chargeSession.chargeState = 'idle'

      const session = port.chargeSession
      sessions.push(session)
      port.chargeSession = undefined

      updateChargeSessions()

      return res.json({ session })
    }
  }
)

router.post(
  '/:portId/state',
  validate(UpdateChargeStateRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    port.chargeSession.chargeState = req.body.chargeState
    updateChargeSessions()

    return res.json({ session: port.chargeSession })
  }
)

router.get('/', (_req: Request, res: Response) => {
  res.json(sessions)
})

export default {
  router
}
