# pev-charger

A frontend for a universal Portable Electric Vehicle charging station.

## Overview

As of April 2024, there is no common charging interface or standard for PEVs (e-bikes, scooters, onewheels, e-skates, etc.). This project aims to specify a standardized way for vehicles to interact with chargers (and eventually) define a physical layer interface for communicating charging requirements between the charging station and a vehicle.

## Demo Application

This demo app has two parts:
1. A charger - this charger has multiple ports for vehicles to connect to and start charging sessions. It has a pre-defined total power budget (wattage) that can be divided between different vehicles that are being charged.
2. Device simulator - this lets you attach a virtual PEV to a charging port on the charging station. Each PEV has it's own charge requirements (as well as safety considerations) that are simulated as part of the charging experience.

### Implementation
- Node.js server app that would run on a charger. The server has details about total current / voltage capacity, active sessions, available power budget available to other charging ports on the charger. PEVS can connect and request to start / stop a charging session assuming there's enough of a power budget left to support charging it. Optionally / as a stretch goal, a payment processor can be added into the app before the charging session is started.
- A React based front end to start / stop the charging session once a device is connected to the charger. Once connected to the charger and a session is started, a QR code is shown to the user so they can follow charging progress remotely with an estimated time to completion as well as status (in case of any faults due to temperature or disconnection). Optionally, request payment from the user before starting the charge session.
- A device simulator page that has multiple devices to choose from.  Each device maintains its internal state of charge, temperature, as well as any faults that might occur during the charge process. Optionally, the user can pre-maturely end the charge session.
