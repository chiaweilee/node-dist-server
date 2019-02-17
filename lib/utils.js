const path = require('path');

const resolve = _ => path.resolve(__dirname, _);
const readFile = require('fs').readFile;

module.exports = {
  resolve,
  readFile,
};
