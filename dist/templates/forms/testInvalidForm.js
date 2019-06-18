"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testInvalidForm;

var _testInstanceMethod = _interopRequireDefault(require("../buttons/testInstanceMethod"));

var _testPropMethod = _interopRequireDefault(require("../buttons/testPropMethod"));

var _blurRequiredFields = _interopRequireDefault(require("./blurRequiredFields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testInvalidForm(submitButtonIdentifier, boundedMethod, testProps, isInstanceMethod, identifiers) {
  return "\n  it('tests Form Fields - failure', () => {\n    ".concat((0, _blurRequiredFields["default"])(identifiers), "\n    ").concat(isInstanceMethod ? (0, _testInstanceMethod["default"])(testProps, submitButtonIdentifier, boundedMethod, 'submit', false) : (0, _testPropMethod["default"])(submitButtonIdentifier, boundedMethod, testProps, 'submit', false), "\n  });");
}