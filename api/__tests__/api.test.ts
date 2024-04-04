import request from 'supertest'
import app from '../src/index'

import {jest} from '@jest/globals'

jest.useFakeTimers()

describe('Test app.ts', () => {
  test('Charger info route', async () => {
    const expectedCharger = {
      name: 'Test charger',
      id: '1234567-890a-bcde-f012-34567890abcd',
      capacity: 2400,
      ports: [
        {
          id: 'c9e05f1c-f4ea-4b05-8b50-5016ec5f8dcd',
          available: true
        },
        {
          id: 'e14e0148-167d-4e67-875d-72a2add58306',
          available: true
        },
        {
          id: 'dc152ef3-6baa-463a-b5ad-7920b6e61364',
          available: true
        },
        {
          id: '6445e56d-55b1-440c-ab95-8fe48b220092',
          available: true
        }
      ]
    }

    const res = await request(app).get('/')
    expect(res.body).toEqual(expectedCharger)
  })
})
