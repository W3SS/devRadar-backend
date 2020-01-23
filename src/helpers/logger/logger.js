const pino = require('pino')
require('dotenv').config({ encoding: 'utf8' })

const pinoConfig = () =>
  pino({
    level: process.env.LOG_LEVEL || 'info',
  )

const logger = pinoConfig()

const loggerRequest = req => pinoConfig().child({ requestId: req['id'] })

module.exports = { logger, loggerRequest }
