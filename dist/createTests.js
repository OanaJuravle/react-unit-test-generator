#!/usr/bin/env node
// require('@babel/register');
"use strict";

var _generalImports = require("./templates/generalImports");

var _generalImports2 = _interopRequireDefault(_generalImports);

var _getFiles = require("./getFiles");

var _getFiles2 = _interopRequireDefault(_getFiles);

var _renderSuiteSchema = require("./templates/renderSuiteSchema");

var _renderSuiteSchema2 = _interopRequireDefault(_renderSuiteSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var fs = require('fs');

console.log('**** From Package ****');
var rootDir = path.join(__dirname, '../../react-app');
console.log('rootDir', rootDir);
var matchedFiles = [];
var files = (0, _getFiles2["default"])("".concat(rootDir, "/src"), matchedFiles, 'UsersIndex');
console.log(files);
process.TEST_GENERATOR_WARNINGS = []; // var fileName = process.argv[2];
// const matchedFiles = [];
// const projectEntry = 'D:\\GitHub\\react-app';
// console.log(projectEntry);
// // // TODO: decide whether or not I should use src here - maybe ask for entry point?
// const files = getFiles(`${projectEntry}\\src`, matchedFiles, fileName);
// console.log('matchedFiles', matchedFiles);
// global.console.log('MATCHED FILES', matchedFiles);

var componentPath = files[0];
var destination = componentPath.split('/').slice(-1)[0].split('.')[0];
var destinationFile = "".concat(rootDir, "/tests/").concat(destination, ".test.js");
console.log('destinationFile', destinationFile);
fs.writeFile(destinationFile, (0, _generalImports2["default"])(componentPath), function (err) {
  if (err) throw err;
  console.log('Added imports');
});
fs.appendFile(destinationFile, (0, _renderSuiteSchema2["default"])(componentPath), function (err) {
  if (err) throw err;
  console.log('Added test suite');
});

try {
  fs.writeFileSync('./testGeneratorWarnings.js', "module.exports = ".concat(JSON.stringify(process.TEST_GENERATOR_WARNINGS)));
  console.log('Added warnings');
} catch (err) {
  throw err;
}