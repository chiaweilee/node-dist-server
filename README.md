# rundist
run your dist!

<a href="https://npmcharts.com/compare/rundist?minimal=true"><img src="https://img.shields.io/npm/dm/rundist.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/rundist"><img src="https://img.shields.io/npm/v/rundist.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/rundist"><img src="https://img.shields.io/npm/l/rundist.svg" alt="License"></a>

### Install

```
npm install rundist
```

### Usage

*package.json add:*

```js
"scripts": {
    "dist": "rundist"
  }
```

```
npm run dist
```

### Custom argv

```js
"scripts": {
    "dist": "rundist --port 8080 --dirname dist --index index.html --extend script/app-watch-git.js"
  }
```

#### --port

default `3000`

#### --index

default `index.html`

#### --dir / --dirname

default to path `dist`

#### --extend

script path to extend the server

default `undefined`

e.g: `rundist --extend script/app-wathch-git.js`

```JavaScript
// script/app-watch-git.js
module.exports = function (app) {
  app.post('/', function () {
    // ...
  })
}
```

#### compression

`support`

#### mime-type & expired

```JavaScript
  'css': ['text/css', 'utf8', 'max-age=31536000'],
  'gif': ['image/gif', 'binary', 'max-age=86400'],
  'html': ['text/html', 'utf8', 'no-cache'],
  'ico': ['image/x-icon', 'binary', 'max-age=86400'],
  'jpeg': ['image/jpeg', 'binary', 'max-age=86400'],
  'jpg': ['image/jpeg', 'binary', 'max-age=86400'],
  'js': ['text/javascript', 'utf8', 'private, max-age=31536000'],
  'json': ['application/json', 'utf8', 'private, max-age=31536000'],
  'woff': ['application/x-font-woff', 'binary', 'private, max-age=31536000'],
  'woff2': ['application/x-font-woff', 'binary', 'private, max-age=31536000'],
  'eot': ['application/octet-stream', 'binary', 'private, max-age=31536000'],
  'otf': ['application/octet-stream', 'binary', 'private, max-age=31536000'],
  'ttf': ['application/octet-stream', 'binary', 'private, max-age=31536000'],
  'png': ['image/png', 'binary', 'max-age=86400'],
  'svg': ['image/svg+xml', 'binary', 'max-age=86400'],
  'tiff': ['image/tiff', 'binary', 'max-age=86400'],
  'txt': ['text/plain', 'utf8', 'max-age=86400'],
  'xml': ['text/xml', 'utf8', 'max-age=86400'],
  'flv': ['video/x-flv', 'binary', 'max-age=86400'],
  'mp4': ['video/mp4', 'binary', 'max-age=86400'],
  'm3u8': ['application/x-mpegURL', 'binary', 'max-age=86400'],
  'ts': ['video/MP2T', 'binary', 'max-age=86400'],
  '3gp': ['video/MP2T', 'binary', 'max-age=86400'],
  'mov': ['video/quicktime', 'binary', 'max-age=86400'],
  'wmv': ['video/x-ms-wmv', 'binary', 'max-age=86400']
```
#### hot-load

`not support yet`
