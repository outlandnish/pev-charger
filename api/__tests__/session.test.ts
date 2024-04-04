import request from 'supertest'
import app from '../src/index'

import {jest} from '@jest/globals'

jest.useFakeTimers()

describe('Test session.ts', () => {
  test('Start session route', async () => {
    const res = await request(app)
      .post('/session/start/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd')
      .send({ deviceId: '12345678-890a-bcde-f012-34567890abcd' })
    expect(res.body).toEqual({
      success: true,
      port: {
        id: 'c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd',
        available: false,
        connectedDevice: '12345678-890a-bcde-f012-34567890abcd'
      }
    })
  })

  test('Stop session route', async () => {
    const res = await request(app)
      .post('/session/stop/c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd')
      .send()
    expect(res.body).toEqual({
      success: true,
      port: {
        id: 'c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd',
        available: true,
        connectedDevice: undefined
      }
    })
  })
})