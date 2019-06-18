#!/usr/bin/env node
// require('@babel/register');
"use strict";

var _require = require('./templates/generalImports'),
    generalImports = _require.generalImports;

var _require2 = require('./getFiles'),
    getFiles = _require2.getFiles; // const { renderTestSuite } = require('./templates/renderSuiteSchema');


var path = require('path');

var fs = require('fs');

console.log('**** From Package ---- ****');
var rootDir = path.join(__dirname, '../../react-app');
console.log('rootDir', rootDir);
var matchedFiles = [];
var files = getFiles("".concat(rootDir, "/src"), matchedFiles, 'UsersIndex');
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
fs.writeFile(destinationFile, generalImports(componentPath), function (err) {
  if (err) throw err;
  console.log('Added imports');
}); // fs.appendFile(destinationFile, renderTestSuite(componentPath), err => {
//   if (err) throw err;
//   console.log('Added test suite');
// });
// try {
//   fs.writeFileSync(
//     './testGeneratorWarnings.js',
//     `module.exports = ${JSON.stringify(window.TEST_GENERATOR_WARNINGS)}`,
//   );
//   console.log('Added warnings');
// } catch (err) {
//   throw err;
// }