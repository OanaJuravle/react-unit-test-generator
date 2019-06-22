import generalImports from './templates/generalImports';
import getFiles from './getFiles';
import renderTestSuite from './templates/renderSuiteSchema';

const jest = require('jest');
const path = require('path');
const fs = require('fs');

console.log('**** From Package ****');
var fileName = process.env.npm_config_fileName;

if (!fileName) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = `No file provided`;
    throw err;
  }
}

const packageName = process.env.npm_package_name;
const rootDir = path.join(__dirname, `../../../../${packageName}`);
console.log('rootDir', rootDir);

let matchedFiles = [];
matchedFiles = getFiles(`${rootDir}/src`, matchedFiles, fileName);
console.log(matchedFiles);

if (matchedFiles.length === 0) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = `Unable to find any file match for ${fileName}`;
    throw err;
  }
}

process.TEST_GENERATOR_WARNINGS = [];

matchedFiles.forEach(componentPath => {
  const destination = componentPath
    .split('/')
    .slice(-1)[0]
    .split('.')[0];

  const relativePath = path
    .relative(path.resolve(packageName, `../../${packageName}/tests`), componentPath)
    .replace(/\\/g, '/');

  const Component = require(componentPath).default;
  if (!Component || !Component.name) {
    try {
      throw new Error('Original Error');
    } catch (err) {
      err.message = `The file ${fileName} does not export a component`;
      throw err;
    }
  }

  try {
    fs.accessSync(componentPath, fs.constants.R_OK);
  } catch (err) {
    console.log(`${destination} is not readable`);
  }

  try {
    fs.accessSync(componentPath, fs.constants.W_OK);
  } catch (err) {
    console.log(`${destination} is not writable`);
  }

  console.log('Generating unit tests for ' + destination + '\n');

  const destinationFile = `${rootDir}/tests/${destination}.test.js`;
  console.log('Destination File: ', destinationFile);

  try {
    console.log('Adding imports...');
    fs.writeFileSync(destinationFile, generalImports(relativePath));
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }

  try {
    console.log('Adding test suite...');
    fs.appendFileSync(destinationFile, renderTestSuite(componentPath));
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }

  try {
    if (process.TEST_GENERATOR_WARNINGS.length > 0) {
      console.log('Adding warnings...');
      fs.writeFileSync(
        path.resolve(__dirname, './testGeneratorWarnings.js'),
        `module.exports = ${JSON.stringify(process.TEST_GENERATOR_WARNINGS)}`,
      );
      console.log('Done!\n');
    }
  } catch (err) {
    throw err;
  }

  const options = {
    collectCoverage: true,
    projects: [rootDir],
    reporters: ['default', path.resolve(__dirname, '../jestCustomReporter.js')],
    setupFiles: [path.resolve(__dirname, '../setupTest.js')],
    silent: true,
    verbose: true,
  };

  jest
    .runCLI(options, options.projects)
    .then(() => {
      console.log('SUCCESS');
    })
    .catch(failure => {
      console.error(failure);
    });
});
