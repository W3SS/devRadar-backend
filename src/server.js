const express = require('express')
const expressMetrics = require('express-metrics')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { routes } = require('../src/routes')

// Leitura das configs do .env
require('dotenv').config({ encoding: 'utf8' })

const app = express()

mongoose.connect(
  process.env.MONGO_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json())
app.use(expressMetrics({
  port: 8091
}));

app.use(cors())

app.use(helmet())
app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(routes)


app.use((req, res, next) => {
  res.status(500)
  res.send('Oops, algo inesperado ocorreu!')
})

/**
 * Listening Port 
 */

if (require.main === module) {
  app.listen(process.env.PORT, (req, res) => {
    console.log('Server listening on port', process.env.PORT)
  })
} else {
  module.exports = { app }
}