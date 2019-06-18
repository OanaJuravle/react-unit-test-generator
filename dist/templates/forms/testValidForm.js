"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testValidForm;

var _fillRequiredFields = _interopRequireDefault(require("./fillRequiredFields"));

var _testInstanceMethod = _interopRequireDefault(require("../buttons/testInstanceMethod"));

var _checkForStateUpdate = _interopRequireDefault(require("../../helpers/checkForStateUpdate"));

var _testPropMethod = _interopRequireDefault(require("../buttons/testPropMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testValidForm(submitButtonIdentifier, boundedMethod, testProps, isInstanceMethod, identifiers) {
  return "\n  it('tests Form Fields - success', () => {\n    ".concat((0, _fillRequiredFields["default"])(identifiers), "\n    ").concat(isInstanceMethod ? (0, _testInstanceMethod["default"])(testProps, submitButtonIdentifier, boundedMethod, 'submit', true) : (0, _testPropMethod["default"])(submitButtonIdentifier, boundedMethod, testProps, 'submit', true), "\n    ").concat(isInstanceMethod ? (0, _checkForStateUpdate["default"])() : '', "\n  });\n  ");
}