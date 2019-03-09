const app = require('express')();
const compression = require('compression');
const fs = require('fs');
const options = require('./option');
const consola = require('consola');

const isHttps = !!options.https;

const { name, version } = require('../package');

consola.info(`🚀 ${name} ${version}`);
consola.info(`starting ${process.env.npm_package_name} ${process.env.npm_package_version}`);

app.use(compression());

const load = function (filename, path) {
  try {
    consola.success(`${filename} load success at ${path}`);
    return fs.readFileSync(path);
  } catch (err) {
    process.stderr.write(err);
    process.exit(1);
  }
};

if (isHttps) {
  consola.success('working in https mode');
  if (options.httpPort !== 80) {
    // redirect http request to https
    consola.success('http request will be redirected https');
    const proxy = require('http').createServer((request, response) => {
      const host = request.headers.host;
      const redirect = `https://${request.headers.host}${/^\d+\.\d+\.\d+\.\d+$/.test(host) ? `:${options.httpPort}` : ''}${request.url}`;
      response.writeHead(301, { Location: redirect });
      response.end();
    });
    proxy.listen(80);
  }
}

const server = isHttps ? require('https').createServer({
  key: load('ssl-key', options.sslKey),
  cert: load('ssl-cert', options.sslCert),
  requestCert: true,
  rejectUnauthorized: false,
}, app) : require('http').Server(app);

module.exports = {
  app,
  server,
};
