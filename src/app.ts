import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import mp4Router from './routes/mp4'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/mp4', mp4Router)

export default app
