#!/usr/bin/env node

const consola = require('consola')
const ip = require('ip')
const request = require('request')
const options = require('./option')
const { app, http } = require('./app')
const mimeType = require('./mime-type')
const { resolve, readFile } = require('./utils')
const { name, version } = require('../package')

app.head('*', function (request) {
  consola.success(`Listen at http://${request.headers.host}`)
})

app.get('*', function (request, response) {
  const url = request.originalUrl !== '/' ? request.originalUrl : `/${options.defaultPage}`
  const [, name, ext] = (() => /\/([^/]+)\.([a-zA-Z0-9]+)$/gi.exec(url.split('?')[0]) || [])()
  const redirect = function (url) {
    readFile(resolve(url), function (err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          // try url rewrite for vue-router history mode
          readFile(resolve(`${options.distPath}${options.defaultPage}`), function (err, data) {
            if (err) {
              response.send(err)
              return
            }
            response.writeHead(200, { 'content-type': 'text/html' })
            response.write(data, 'utf8')
            response.end()
          })
          return //
        }
        response.send(err)
        return
      }
      response.writeHead(200, {
        'Cache-Control': (!(name === 'service-worker' && ext === 'js') && mimeType[ext] && mimeType[ext][2]) || 'no-cache',
        'content-type': (mimeType[ext] && mimeType[ext][0]) || 'text/plain'
      })
      response.write(data, (mimeType[ext] && mimeType[ext][1]) || 'utf8')
      response.end()
    })
  }
  redirect(`${options.distPath}${url}`, (mimeType[ext] || [])[1])
})

http.listen(options.httpPort, function () {
  consola.info(`🚀 ${name} ${version}`)

  // test
  request.head(`http://localhost:${options.httpPort}/`)
  request.head(`http://${ip.address()}:${options.httpPort}/`)
})
