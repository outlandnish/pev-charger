import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
import { ChargerPort } from '@charger/common'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, req.params, req.query)
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }

export const findPort =
  (ports: ChargerPort[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { portId } = req.params

    const port = ports.find((port) => port.id === portId)
    if (!port) return res.status(404).json({ error: 'Port not found' })

    req.port = port
    next()
  }
