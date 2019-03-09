#!/usr/bin/env node

const consola = require('consola');
const ip = require('ip');
const options = require('../lib/option');
const { app, server } = require('../lib/app');
const mimeType = require('../lib/mime-type');
const { resolve, readFile } = require('../lib/utils');

if (options.extendPath) {
  const extend = require(options.extendPath);
  if (typeof extend === 'function') {
    consola.success(`extend load success at ${options.extendPath}`);
    extend(app);
  } else {
    consola.error(`extend load fail at ${options.extendPath}, 'module.exports' must be a function`);
  }
}

app.get('*', (request, response) => {
  const url = request.originalUrl !== '/' ? request.originalUrl : `/${options.defaultPage}`;
  const [, name, ext] = (() => /\/([^/]+)\.([a-zA-Z0-9]+)$/gi.exec(url.split('?')[0]) || [])();
  const redirect = function (toUrl) {
    readFile(resolve(toUrl), (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // try url rewrite for vue-router history mode
          readFile(resolve(`${options.distPath}${options.defaultPage}`), (_err, _data) => {
            if (_err) {
              response.send(_err);
              return;
            }
            response.writeHead(200, { 'content-type': 'text/html' });
            response.write(_data, 'utf8');
            response.end();
          });
          return; //
        }
        response.send(err);
        return;
      }
      response.writeHead(200, {
        'Cache-Control': (!(name === 'service-worker' && ext === 'js') && mimeType[ext] && mimeType[ext][2]) || 'no-cache',
        'content-type': (mimeType[ext] && mimeType[ext][0]) || 'text/plain',
      });
      response.write(data, (mimeType[ext] && mimeType[ext][1]) || 'utf8');
      response.end();
    });
  };
  redirect(`${options.distPath}${url}`, (mimeType[ext] || [])[1]);
});

server.listen(options.httpPort, () => {
  const isHttps = !!options.https;
  const httpProto = isHttps ? 'https' : 'http';
  if (!isHttps) consola.success(`Listen at http://localhost:${options.httpPort}/`);
  consola.success(`Listen at ${httpProto}://${ip.address()}:${options.httpPort}/`);
});
