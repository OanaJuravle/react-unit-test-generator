"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testInvalidForm;

var _testInstanceMethod = require("../buttons/testInstanceMethod");

var _testInstanceMethod2 = _interopRequireDefault(_testInstanceMethod);

var _testPropMethod = require("../buttons/testPropMethod");

var _testPropMethod2 = _interopRequireDefault(_testPropMethod);

var _blurRequiredFields = require("./blurRequiredFields");

var _blurRequiredFields2 = _interopRequireDefault(_blurRequiredFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testInvalidForm(submitButtonIdentifier, boundedMethod, testProps, isInstanceMethod, identifiers) {
  return "\n  it('tests Form Fields - failure', () => {\n    ".concat((0, _blurRequiredFields2["default"])(identifiers), "\n    ").concat(isInstanceMethod ? (0, _testInstanceMethod2["default"])(testProps, submitButtonIdentifier, boundedMethod, 'submit', false) : (0, _testPropMethod2["default"])(submitButtonIdentifier, boundedMethod, testProps, 'submit', false), "\n  });");
}