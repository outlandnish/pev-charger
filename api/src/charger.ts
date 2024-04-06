import { Charger } from '@charger/common'
import dotenv from 'dotenv'
dotenv.config()

const { MAINS_VOLTAGE, MAINS_CURRENT, CHARGER_NAME, CHARGER_ID } = process.env

const mainsVoltage = MAINS_VOLTAGE ? parseInt(MAINS_VOLTAGE) : 0
const mainsCurrent = MAINS_CURRENT ? parseInt(MAINS_CURRENT) : 0

export const charger: Charger = {
  name: CHARGER_NAME || 'Test charger',
  id: CHARGER_ID || '1234567-890a-bcde-f012-34567890abcd',
  capacity: mainsVoltage * mainsCurrent,
  availableCapacity: mainsVoltage * mainsCurrent,
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

const getMaxPowerRate = (capacity: number, rates: Array<number>, voltage: number) => {
  for (let i = rates.length - 1; i >= 0; i--) {
    if (rates[i] * voltage <= capacity) {
      return rates[i]
    }
  }
  return null
}

export const updateChargeSessions = () => {
  let capacity = charger.capacity

  // Charge sessions started earlier get priority on charge rates
  const activeSessions = charger.ports
    .filter((port) => port.chargeSession)
  
  // For each active session, calculate the maximum power rate that can be supported
  activeSessions
    .sort((a, b) => a.chargeSession.startTime.getTime() - b.chargeSession.startTime.getTime())
    .forEach((port) => {
      if (port.chargeSession) {
        switch (port.chargeSession.chargeState) {
          case 'charge':
            const chargeRate = getMaxPowerRate(capacity, port.vehicle.supportedChargeCurrent, port.vehicle.voltage)
            if (chargeRate) {
              capacity -= port.vehicle.supportedChargeCurrent[0] * port.vehicle.voltage
              port.chargeSession.fault = null
            }
            else 
              port.chargeSession.fault = 'unavailable'
            break
          case 'balance':
            const balanceRate = getMaxPowerRate(capacity, port.vehicle.supportedBalanceCurrent, port.vehicle.voltage)
            if (balanceRate) {
              capacity -= port.vehicle.supportedBalanceCurrent[0] * port.vehicle.voltage
              port.chargeSession.fault = null
            }
            else 
              port.chargeSession.fault = 'unavailable'
            break
        }
      }
    })

  charger.availableCapacity = activeSessions.length > 0 ? capacity : charger.capacity
}
