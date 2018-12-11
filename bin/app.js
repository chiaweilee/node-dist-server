const app = require('express')()
const compression = require('compression')
const fs = require('fs')
const options = require('./option')
const isHttps = !!options.https

app.use(compression())

const load = function (name, path) {
  try {
    consola.success(`${name} load success at ${path}`)
    return fs.readFileSync(path)
  } catch (err) {
    process.stderr.write(err)
    process.exit(1)
  }
}

consola.info(`🚀 ${process.env.npm_package_name} ${process.env.npm_package_version}`)

if (isHttps) {
  consola.success(`working in https mode`)
}

const server = isHttps ? require('https').createServer({
  key: load('ssl-key', options.sslKey),
  cert: load('ssl-cert', options.sslCert),
  requestCert: true,
  rejectUnauthorized: false
}, app) : require('http').Server(app)

module.exports = {
  app,
  server
}
