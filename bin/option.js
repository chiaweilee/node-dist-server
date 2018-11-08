const options = {
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
        options.httpPort = next
      }
      break
    case '--dir':
      if (next) {
        options.distPath = next
      }
      break
    case '--dirname':
      if (next) {
        options.distPath = `../../../${next}/`
      }
      break
    case '--index':
      if (next) {
        options.defaultPage = next
      }
      break
    default:
      break
  }
})

module.exports = options
