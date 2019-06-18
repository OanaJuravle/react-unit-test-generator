#!/usr/bin/env node

// require('@babel/register');
const { generalImports } = require('./templates/generalImports');
const { getFiles } = require('./getFiles');
// const { renderTestSuite } = require('./templates/renderSuiteSchema');
const path = require('path');
const fs = require('fs');

console.log('**** From Package ---- ****');
const rootDir = path.join(__dirname, '../../react-app');
console.log('rootDir', rootDir);

const matchedFiles = [];
const files = getFiles(`${rootDir}/src`, matchedFiles, 'UsersIndex');
console.log(files);

process.TEST_GENERATOR_WARNINGS = [];

// var fileName = process.argv[2];
// const matchedFiles = [];

// const projectEntry = 'D:\\GitHub\\react-app';
// console.log(projectEntry);

// // // TODO: decide whether or not I should use src here - maybe ask for entry point?
// const files = getFiles(`${projectEntry}\\src`, matchedFiles, fileName);
// console.log('matchedFiles', matchedFiles);
// global.console.log('MATCHED FILES', matchedFiles);

const componentPath = files[0];
const destination = componentPath
  .split('/')
  .slice(-1)[0]
  .split('.')[0];

const destinationFile = `${rootDir}/tests/${destination}.test.js`;
console.log('destinationFile', destinationFile);

fs.writeFile(destinationFile, generalImports(componentPath), err => {
  if (err) throw err;
  console.log('Added imports');
});

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
