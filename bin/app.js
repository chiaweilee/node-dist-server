const app = require('express')()
const compression = require('compression')

app.use(compression())

const http = require('http').Server(app)

module.exports = {
  app,
  http
}
