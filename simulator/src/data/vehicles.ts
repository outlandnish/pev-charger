import { Vehicle } from "@charger/common";

export const vehicles: Vehicle[] = [
  {
    id: '44fe8110-ebae-4059-a723-21762e048c44',
    name: 'Onewheel Pint',
    type: 'onewheel',
    supportedChargeCurrent: [1, 2, 3],
    supportedBalanceCurrent: [0.5],
    stateOfCharge: 50,
    chargeState: 'charge',
    capacity: 148,
    voltage: 63,
    batteryType: 'lithium-ion'
  }, 
  {
    id: '49f10e83-07d2-4e40-8943-30534466e098',
    name: 'Onewheel XR',
    type: 'onewheel',
    supportedChargeCurrent: [3, 4, 5],
    supportedBalanceCurrent: [0.5],
    stateOfCharge: 50,
    chargeState: 'charge',
    capacity: 324,
    voltage: 63,
    batteryType: 'lithium-ion'
  },
  {
    id: 'c3d67962-3ff6-4ce8-b02b-3c440ab8a57f',
    name: 'Onewheel GT',
    type: 'onewheel',
    supportedChargeCurrent: [5],
    supportedBalanceCurrent: [0.5],
    stateOfCharge: 50,
    chargeState: 'charge',
    capacity: 525,
    voltage: 74.5,
    batteryType: 'lithium-ion'
  },
  {
    id: 'c3d67962-3ff6-4ce8-b02b-3c440ab8a57f',
    name: 'Onewheel GTS',
    type: 'onewheel',
    supportedChargeCurrent: [5],
    supportedBalanceCurrent: [0.5],
    stateOfCharge: 50,
    chargeState: 'charge',
    capacity: 437,
    voltage: 113,
    batteryType: 'lithium-ion'
  },
]