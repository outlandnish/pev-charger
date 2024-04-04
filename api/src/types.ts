import { z } from 'zod'

const ChargerPort = z.object({
  id: z.string().uuid(),
  available: z.boolean(),
  connectedDevice: z.string().uuid().optional()
})

const Charger = z.object({
  name: z.string().uuid(),
  id: z.string(),
  capacity: z.number(),
  ports: z.array(ChargerPort)
})

export type ChargerPort = z.infer<typeof ChargerPort>
export type Charger = z.infer<typeof Charger>

export const StartSessionRequest = z.object({
  body: z.object({
    deviceId: z.string().uuid()
  }),
  params: z.object({
    portId: z.string().uuid()
  })
})

export const StopSessionRequest = z.object({
  params: z.object({
    portId: z.string().uuid()
  })
})
