import express, { Request, Response } from 'express'
import { StartSessionRequest, StopSessionRequest } from './types'
import { findPort, validate } from './utils'
import { charger } from './charger'

const router = express.Router()

router.post(
  '/start/:portId',
  validate(StartSessionRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { deviceId } = req.body
    const { port } = req
    if (!port) return
    console.log(`Starting session on port ${port.id} for device ${deviceId}`)

    if (!port.available)
      return res.status(400).json({ error: 'Port is not available' })
    else {
      port.available = false
      port.connectedDevice = deviceId
      return res.json({ success: true, port })
    }
  }
)

router.post(
  '/stop/:portId',
  validate(StopSessionRequest),
  findPort(charger.ports),
  (req: Request, res: Response) => {
    const { port } = req
    if (!port) return

    if (port.available)
      return res.status(400).json({ error: 'Port is already available' })
    else {
      port.available = true
      port.connectedDevice = undefined
      return res.json({ success: true, port })
    }
  }
)

export default {
  router
}
