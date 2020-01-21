const express = require('express')
const expressMetrics = require('express-metrics')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { routes } = require('../src/routes')

const banner = '[ -- DevRadar - OnGoing --]'
require('simple-banner').set(banner, 0, 1)
const app = express()

mongoose.connect(
  'mongodb+srv://devRadar:devRadar@cluster0-9whlq.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json())
app.use(expressMetrics({
  port: 8091
}));

const expressLogger = expressPino({ logger })
app.use(expressLogger)
app.use((req, res, next) => {
  logger.trace(
    { req, requestId: req.headers['X-Request-Id'] },
    'A new request received at ' + Date.now()
  )
  next()
})

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(routes)
app.use(function(err, req, res, next) {
  logger.error(err)
  res.status(500)
  res.send('Oops, algo inesperado ocorreu!')
})

app.listen(3333)