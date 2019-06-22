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

if (!fileName) {
  try {
    throw new Error('Original Error');
  } catch (err) {
    err.message = "No file provided";
    throw err;
  }
}

var packageName = process.env.npm_package_name;
var rootDir = path.join(__dirname, "../../../../".concat(packageName));
console.log('rootDir', rootDir);
var matchedFiles = [];
matchedFiles = (0, _getFiles2["default"])("".concat(rootDir, "/src"), matchedFiles, fileName);
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
  var destination = componentPath.split('/').slice(-1)[0].split('.')[0];
  var relativePath = path.relative(path.resolve(packageName, "../../".concat(packageName, "/tests")), componentPath).replace(/\\/g, '/');

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
    console.log("".concat(destination, " is not readable"));
  }

  try {
    fs.accessSync(componentPath, fs.constants.W_OK);
  } catch (err) {
    console.log("".concat(destination, " is not writable"));
  }

  console.log('Generating unit tests for ' + destination + '\n');
  var destinationFile = "".concat(rootDir, "/tests/").concat(destination, ".test.js");
  console.log('Destination File: ', destinationFile);

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
    console.log('Done!\n');
  } catch (err) {
    throw err;
  }

  try {
    if (process.TEST_GENERATOR_WARNINGS.length > 0) {
      console.log('Adding warnings...');
      fs.writeFileSync(path.resolve(__dirname, './testGeneratorWarnings.js'), "module.exports = ".concat(JSON.stringify(process.TEST_GENERATOR_WARNINGS)));
      console.log('Done!\n');
    }
  } catch (err) {
    throw err;
  }

  var options = {
    collectCoverage: true,
    projects: [rootDir],
    reporters: ['default', path.resolve(__dirname, '../jestCustomReporter.js')],
    setupFiles: [path.resolve(__dirname, '../setupTest.js')],
    silent: true,
    verbose: true
  };
  jest.runCLI(options, options.projects).then(function () {
    console.log('SUCCESS');
  })["catch"](function (failure) {
    console.error(failure);
  });
});