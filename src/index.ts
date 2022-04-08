import express, { application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { connectDb } from './lib'
import 'colors'
import { ProductsRouter, UsersRouter } from './routes'
;(async () => {
  dotenv.config()
  connectDb()
  const app = express()
  app.use(morgan('dev'))
  app.use(cors())
  app.use(bodyParser.json())
  app.use('/users', UsersRouter)
  app.use('/products', ProductsRouter)
  app.listen(process.env.PORT, () => {
    console.log(`[i] Server is running on port ${process.env.PORT}`.yellow)
  })
})()
