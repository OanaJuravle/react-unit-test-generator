"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTests = generateTests;

var _getFiles = require("./getFiles");

var _getFiles2 = _interopRequireDefault(_getFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require('@babel/register');
// import generalImports from './templates/generalImports';
// // import renderTestSuite from './templates/renderSuiteSchema';
var path = require('path');

var fs = require('fs');

function generateTests() {
  console.log('**** From Package ---- ****');
  var rootDir = path.resolve(__dirname, './src');
  console.log('rootDir', rootDir);
  var matchedFiles = [];
  var files = (0, _getFiles2["default"])(rootDir, matchedFiles, 'UsersIndex');
  console.log(files);
} // module.exports = { generateTests };
// window.TEST_GENERATOR_WARNINGS = [];
// var fileName = process.argv[2];
// const matchedFiles = [];
// const projectEntry = 'D:\\GitHub\\react-app';
// console.log(projectEntry);
// // // TODO: decide whether or not I should use src here - maybe ask for entry point?
// const files = getFiles(`${projectEntry}\\src`, matchedFiles, fileName);
// console.log('matchedFiles', matchedFiles);
// global.console.log('MATCHED FILES', matchedFiles);
// const componentPath = files[0];
// const destination = componentPath
//   .split('/')
//   .slice(-1)[0]
//   .split('.')[0];
// const destinationFile = `${projectEntry}tests\\${destination}.test.js`;
// fs.writeFile(destinationFile, generalImports(componentPath), err => {
//   if (err) throw err;
//   console.log('Added imports');
// });
// fs.appendFile(destinationFile, renderTestSuite(componentPath), err => {
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