import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import mp4Router from './routes/mp4'
import storeRouter from './routes/store'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/mp4', mp4Router)
app.use('/store', storeRouter)

export default app
