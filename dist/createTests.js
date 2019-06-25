"use strict";

var _generalImports = require("./templates/generalImports");

var _generalImports2 = _interopRequireDefault(_generalImports);

var _getFiles = require("./getFiles");

var _getFiles2 = _interopRequireDefault(_getFiles);

var _renderSuiteSchema = require("./templates/renderSuiteSchema");

var _renderSuiteSchema2 = _interopRequireDefault(_renderSuiteSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jest = require('jest');

var path = require('path');

var fs = require('fs');

console.log('**** From Package ****');
var fileName = process.env.npm_config_fileName;
var filesToRunTestsFor = [];

if (!fileName) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = "No file provided! Please provide a file/path argument: --fileName=<FileNameOrPath>";
    throw err;
  }
}

var packageName = process.env.npm_package_name;
var rootDir = path.join(__dirname, "../../../../".concat(packageName));
console.log('rootDir', rootDir);
var srcPath = './src';
var testsPath = './tests';
var configFileName = '';
process.argv.map(function (arg) {
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

var matchedFiles = [];
matchedFiles = (0, _getFiles2["default"])(path.join(rootDir, srcPath), matchedFiles, fileName);
console.log(matchedFiles);

if (matchedFiles.length === 0) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = "Unable to find any file match for ".concat(fileName);
    throw err;
  }
}

process.TEST_GENERATOR_WARNINGS = [];
matchedFiles.forEach(function (componentPath) {
  var componentName = componentPath.split('/').slice(-1)[0].split('.')[0];
  var relativePath = path.relative(path.resolve(packageName, '../../'.concat(path.join(packageName, testsPath))), componentPath).replace(/\\/g, '/');

  var Component = require(componentPath)["default"];

  if (!Component || !Component.name) {
    try {
      throw new Error('Original Error');
    } catch (err) {
      err.message = "The file ".concat(fileName, " does not export a component");
      throw err;
    }
  }

  try {
    fs.accessSync(componentPath, fs.constants.R_OK);
  } catch (err) {
    console.log("".concat(componentName, " is not readable"));
  }

  try {
    fs.accessSync(componentPath, fs.constants.W_OK);
  } catch (err) {
    console.log("".concat(componentName, " is not writable"));
  }

  console.log('Generating unit tests for ' + componentName + '\n');
  var destinationFile = path.join(rootDir, testsPath).concat('/', componentName, '.test.js');
  console.log('Destination File: ', path.normalize(destinationFile));

  try {
    console.log('Adding imports...');
    fs.writeFileSync(destinationFile, (0, _generalImports2["default"])(relativePath));
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }

  try {
    console.log('Adding test suite...');
    fs.appendFileSync(destinationFile, (0, _renderSuiteSchema2["default"])(componentPath));
    filesToRunTestsFor.push(destinationFile.substring(destinationFile.indexOf(componentName)));
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }
});
var options = {
  collectCoverage: true,
  projects: [rootDir],
  reporters: ['default', path.resolve(__dirname, '../jestCustomReporter.js')],
  setupFiles: [path.resolve(__dirname, '../setupTest.js')],
  testPathPattern: filesToRunTestsFor,
  verbose: true
};

try {
  jest.runCLI(options, options.projects);
} catch (err) {
  throw err;
}