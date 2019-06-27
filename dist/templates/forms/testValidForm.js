"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testValidForm;

var _fillRequiredFields = require("./fillRequiredFields");

var _fillRequiredFields2 = _interopRequireDefault(_fillRequiredFields);

var _testInstanceMethod = require("../buttons/testInstanceMethod");

var _testPropMethod = require("../buttons/testPropMethod");

var _testPropMethod2 = _interopRequireDefault(_testPropMethod);

var _checkForStateUpdate = require("../../helpers/checkForStateUpdate");

var _checkForStateUpdate2 = _interopRequireDefault(_checkForStateUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testValidForm(submitButtonIdentifier, boundedMethod, testProps, isInstanceMethod, identifiers, action) {
  return "\n  it('tests Form Fields - success', () => {\n    ".concat((0, _fillRequiredFields2["default"])(identifiers), "\n    ").concat(isInstanceMethod ? (0, _testInstanceMethod.renderTestDescription)(submitButtonIdentifier, action, true) : (0, _testPropMethod.renderTestDescription)(submitButtonIdentifier, boundedMethod, action, true), "\n    ").concat(isInstanceMethod ? (0, _checkForStateUpdate2["default"])() : '', "\n  });\n  ");
}