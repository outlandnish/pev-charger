import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from './session.js'
import ports from './ports.js'
import { charger } from './charger.js'

dotenv.config()

const app: Express = express()

// common middleware
app.use(express.json())
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.json(charger)
})

app.use('/session', session.router)
app.use('/ports', ports.router)

export default app
