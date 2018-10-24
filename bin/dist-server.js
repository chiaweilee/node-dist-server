#!/usr/bin/env node

const option = {
  httpPort: 3000,
  defaultPage: 'index.html',
  distPath: '../../../dist/'
}
const argv = process.argv.slice(2)
argv.forEach((arg, i) => {
  const next = argv[i + 1]
  switch (arg) {
    case '--port':
      if (!isNaN(argv[i + 1])) {
        option.httpPort = next
      }
      break
    case '--dirname':
      if (next) {
        option.distPath = next
      }
      break
    case '--index':
      if (next) {
        option.defaultPage = next
      }
      break
    default:
      break
  }
})
const compression = require('compression')
const path = require('path')
const app = require('express')()
app.use(compression())
const http = require('http').Server(app)
const fs = require('fs')
const resolve = _ => path.resolve(__dirname, _)
const mimeType = {
  'css': ['text/css', 'utf8'],
  'gif': ['image/gif', 'binary'],
  'html': ['text/html', 'utf8'],
  'ico': ['image/x-icon', 'binary'],
  'jpeg': ['image/jpeg', 'binary'],
  'jpg': ['image/jpeg', 'binary'],
  'js': ['text/javascript', 'utf8'],
  'json': ['application/json', 'utf8'],
  'png': ['image/png', 'binary'],
  'svg': ['image/svg+xml', 'binary'],
  'tiff': ['image/tiff', 'binary'],
  'txt': ['text/plain', 'utf8'],
  'xml': ['text/xml', 'utf8']
}

app.get('*', function (request, response) {
  const url = request.originalUrl !== '/' ? request.originalUrl : `/${option.defaultPage}`
  const ext = (() => /\.([a-zA-Z0-9]+)$/gi.exec(url.split('?')[0]) || [])()[1]
  const redirect = function (url, rewrite = false) {
    fs.readFile(resolve(url), function (err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          // try url rewrite for vue-router history mode
          fs.readFile(resolve(`${option.distPath}${option.defaultPage}`), function (err, data) {
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
      response.writeHead(200, { 'content-type': (mimeType[ext] && mimeType[ext][0]) || 'text/plain' })
      response.write(data, (mimeType[ext] && mimeType[ext][1]) || 'utf8')
      response.end()
    })
  }
  redirect(`${option.distPath}${url}`, (mimeType[ext] || [])[1])
})

http.listen(option.httpPort, function () {
  console.log(`> Listening on *:${option.httpPort}`)
})
