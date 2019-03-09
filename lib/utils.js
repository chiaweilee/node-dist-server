const path = require('path');

const resolve = _ => path.resolve(__dirname, _);
const { readFile } = require('fs');

module.exports = {
  resolve,
  readFile,
};
