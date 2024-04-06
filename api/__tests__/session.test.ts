import { jest, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../src/index'
import { Vehicle } from '@charger/common'

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
  voltage: 63,
  batteryType: 'lithium-ion'
}

describe('Session API', () => {
  test('Start session - no vehicle connected', async () => {
    const res = await request(app)
      .post('/session/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/start')
      .send()

    expect(res.status).toBe(400)
  })

  test('Start session', async () => {
    // connect a vehicle first
    const res = await request(app)
      .post('/ports/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/connect')
      .send({ vehicle: onewheelPint })

    expect(res.status).toBe(200)

    const startRes = await request(app).post(
      '/session/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/start'
    )

    expect(startRes.status).toBe(200)
    expect(startRes.body.session).toBeDefined()
    expect(startRes.body.session.chargeState).toBe('idle')
  })

  test('Start charging', async () => {
    const res = await request(app)
      .post('/session/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/state')
      .send({ chargeState: 'charge' })

    expect(res.status).toBe(200)
    expect(res.body.session.chargeState).toBe('charge')
    
    const chargerRes = await request(app)
      .get('/')
    
    expect(chargerRes.status).toBe(200)
    expect(chargerRes.body.availableCapacity).toBe(2400 - (3 * 63))
  })

  test('Start balancing', async () => {
    const res = await request(app)
      .post('/session/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/state')
      .send({ chargeState: 'balance' })

    expect(res.status).toBe(200)
    expect(res.body.session.chargeState).toBe('balance')
    
    const chargerRes = await request(app)
      .get('/')
    
    expect(chargerRes.status).toBe(200)
    expect(chargerRes.body.availableCapacity).toBe(2400 - (0.5 * 63))
  })

  test('Stop session', async () => {
    const res = await request(app)
      .post('/session/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd/stop')
      .send({ reason: 'interrupted' })

    expect(res.status).toBe(200)
    expect(res.body.session).toBeDefined()
    expect(res.body.session.endReason).toBe('interrupted')
  })
})
