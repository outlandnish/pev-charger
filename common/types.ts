import { z } from 'zod'


export const ChargeState = z.enum(['idle', 'discharging', 'preheat', 'charge', 'balance', 'complete'])
export type ChargeState = z.infer<typeof ChargeState>

export const StartSessionRequest = z.object({
  params: z.object({
    portId: z.string().uuid(),
  })
})

export const StopSessionRequest = z.object({
  params: z.object({
    portId: z.string().uuid()
  })
})

export const SupportedChargeRate = z.object({
  voltage: z.number(),
  current: z.number(),
})

export const VehicleType = z.enum(['e-bike', 'e-skate', 'scooter', 'onewheel', 'euc', 'motorcycle', 'other'])
export type VehicleType = z.infer<typeof VehicleType>

export const Vehicle = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: VehicleType,
  voltage: z.number().optional(),
  capacity: z.number(),
  supportedChargeCurrent: z.array(z.number()),
  supportedBalanceCurrent: z.array(z.number()),
  stateOfCharge: z.number(),
  chargeState: ChargeState,
})
export type Vehicle = z.infer<typeof Vehicle>

export const ConnectRequest = z.object({
  body: z.object({
    vehicle: Vehicle
  }),
  params: z.object({
    portId: z.string().uuid()
  })
})
export type ConnectRequest = z.infer<typeof ConnectRequest>

export const SessionEndReason = z.enum(['complete', 'interrupted', 'error'])

export const DisconnectRequest = z.object({
  params: z.object({
    portId: z.string().uuid(),
  })
})

export const ChargeSession = z.object({
  id: z.string().uuid(),
  chargerId: z.string().uuid(),
  portId: z.string().uuid(),
  vehicle: Vehicle,
  startTime: z.date(),
  endTime: z.date().optional(),
  energyDelivered: z.number(),
  endReason: SessionEndReason.optional(),
  chargeState: ChargeState.default('idle')
})
export type ChargeSession = z.infer<typeof ChargeSession>

export const ChargerPort = z.object({
  id: z.string().uuid(),
  available: z.boolean(),
  vehicle: Vehicle.optional(),
  chargeSession: ChargeSession.optional()
})

const Charger = z.object({
  name: z.string().uuid(),
  id: z.string(),
  capacity: z.number(),
  ports: z.array(ChargerPort)
})

export type ChargerPort = z.infer<typeof ChargerPort>
export type Charger = z.infer<typeof Charger>