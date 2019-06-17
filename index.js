require('@babel/register');
import generalImports from './src/templates/generalImports';
import getFiles from './src/getFiles';
import renderTestSuite from './src/templates/renderSuiteSchema';

const path = require('path');
const fs = require('fs');

window.TEST_GENERATOR_WARNINGS = [];

exports.generateTests = function(fileName) {
  console.log('**** From Package ****');
  const projectEntry = 'D:\\GitHub\\react-app';
  const packageName = process.env.npm_package_name;
  console.log('packageName', packageName);
  console.log('PROCESS', process);

  const matchedFiles = [];

  const files = getFiles(`${projectEntry}\\src`, matchedFiles, fileName);
  console.log('matchedFiles', matchedFiles);
};

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
//     './src/testGeneratorWarnings.js',
//     `module.exports = ${JSON.stringify(window.TEST_GENERATOR_WARNINGS)}`,
//   );
//   console.log('Added warnings');
// } catch (err) {
//   throw err;
// }
