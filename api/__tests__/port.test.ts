import { jest, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../src/index'
import { ChargerPort, Vehicle } from '@charger/common'

jest.useFakeTimers()

const onewheelPint: Vehicle = {
  id: '12345678-890a-bcde-f012-34567890abcd',
  name: 'Onewheel Pint',
  type: 'onewheel',
  supportedChargeCurrent: [1, 2, 3],
  supportedBalanceCurrent: [0.5],
  stateOfCharge: 50,
  chargeState: 'charge',
  capacity: 144,
  voltage: 63
}

describe('Port api', () => {
  test('Connect to port', async () => {
    const res = await request(app)
      .post('/ports/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/connect')
      .send({ vehicle: onewheelPint })

    expect(res.status).toBe(200)

    const result = await ChargerPort.parseAsync(res.body.port)
    expect(result.available).toBe(false)
    expect(result.vehicle).not.toBeUndefined()
  })

  test('Disconnect from port', async () => {
    const res = await request(app)
      .post('/ports/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/disconnect')
      .send()

    expect(res.status).toBe(200)

    const result = await ChargerPort.parseAsync(res.body.port)
    expect(result.available).toBe(true)
    expect(result.vehicle).toBeUndefined()
  })
})
