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
    "dist": "rundist --port 8080 --dirname dist --index index.html"
  }
```

### support

- support 'dist' floder in your project
- default index file name: index.html
- default host: http://localhost
- default port: 3000
- support .css .gif .html .ico .jpeg .jpg .js .json .png .svg .tiff .txt .xml
- support Vue history mode
- **not support hot load**
