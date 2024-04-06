import express, { Request, Response } from 'express'
import { ConnectRequest, DisconnectRequest } from '@charger/common'
import { findPort, validate } from './utils.js'
import { charger } from './charger.js'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  res.json(charger.ports)
})

router.post(
  '/:portId/connect',
  validate(ConnectRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    if (!port.available)
      return res.status(400).json({ error: 'Port is not available' })
    else {
      port.available = false
      port.vehicle = req.body.vehicle
      return res.json({ success: true, port })
    }
  }
)

router.post(
  '/:portId/disconnect',
  validate(DisconnectRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    if (port.available)
      return res.status(400).json({ error: 'Port is already available' })
    else {
      if (port.chargeSession)
        return res.status(400).json({
          error:
            'Charge session in progress. Please end the session before disconnecting'
        })

      port.available = true
      port.vehicle = undefined
      return res.json({ success: true, port })
    }
  }
)

export default {
  router
}
