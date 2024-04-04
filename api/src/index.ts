import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import session from './session'
import { charger } from './charger'

dotenv.config()

const app: Express = express()
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.json(charger)
})

app.use('/session', session.router)

export default app
