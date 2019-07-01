import generalImports from './templates/generalImports';
import getFiles from './getFiles';
import renderTestSuite from './templates/renderSuiteSchema';

const jest = require('jest');
const path = require('path');
const fs = require('fs');

const fileName = process.env.npm_config_fileName;
const filesToRunTestsFor = [];

if (!fileName) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = `No file provided! Please provide a file/path argument: --fileName=<FileNameOrPath>`;
    throw err;
  }
}

const packageName = process.env.npm_package_name;
const rootDir = path.join(__dirname, `../../../../${packageName}`);

let srcPath = './src';
let testsPath = './tests';

let configFileName = '';
process.argv.map(arg => {
  if (arg.includes('--config')) {
    configFileName = arg.split('--config=')[1];
  }
});

if (configFileName) {
  try {
    var pathToConfigFile = path.join(rootDir, './'.concat(configFileName));
    if (fs.existsSync(pathToConfigFile)) {
      try {
        var configOptions = fs.readFileSync(pathToConfigFile);
        configOptions = JSON.parse(configOptions);

        if (configOptions.entry) {
          srcPath = configOptions.entry;
        }

        if (configOptions.destination) {
          testsPath = configOptions.destination;
        }
      } catch (err) {
        err.message = 'Unable to read from config file.';
        throw err;
      }
    } else {
      throw new Error('Cannot find the specified config file.');
    }
  } catch (err) {
    throw err;
  }
}

let matchedFiles = [];
matchedFiles = getFiles(path.join(rootDir, srcPath), matchedFiles, fileName);
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
  const componentName = componentPath
    .split('/')
    .slice(-1)[0]
    .split('.')[0];

  const relativePath = path
    .relative(
      path.resolve(packageName, '../../'.concat(path.join(packageName, testsPath))),
      componentPath,
    )
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
    console.log(`${componentName} is not readable`);
  }

  try {
    fs.accessSync(componentPath, fs.constants.W_OK);
  } catch (err) {
    console.log(`${componentName} is not writable`);
  }

  console.log('Generating unit tests for ' + componentName + '\n');

  const destinationFile = path.join(rootDir, testsPath).concat('/', componentName, '.test.js');
  console.log('Destination File: ', path.normalize(destinationFile));

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
    filesToRunTestsFor.push(destinationFile.substring(destinationFile.indexOf(componentName)));
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }
});

const options = {
  collectCoverage: true,
  projects: [rootDir],
  reporters: ['default', path.resolve(__dirname, '../jestCustomReporter.js')],
  setupFiles: [path.resolve(__dirname, '../setupTest.js')],
  testPathPattern: filesToRunTestsFor,
  verbose: true,
};

try {
  jest.runCLI(options, options.projects);
} catch (err) {
  throw err;
}
