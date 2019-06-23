"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testInvalidForm;

var _blurRequiredFields = require("./blurRequiredFields");

var _blurRequiredFields2 = _interopRequireDefault(_blurRequiredFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function checkFormIsInvalid(submitButtonIdentifier) {
  if (submitButtonIdentifier.disabled === true) {
    return "\n    const button = component.find('button[data-testid=\"".concat(submitButtonIdentifier.identifier, "\"]');\n    expect(button.props().disabled).toBeTruthy();\n    ");
  }

  return checkForErrors();
}

function checkForErrors() {
  return "expect(component.find(form).find('.error').length).toBeGreaterThanOrEqual(1)";
}

function testInvalidForm(submitButtonIdentifier, identifiers) {
  return "\n  it('tests Form Fields - failure', () => {\n    ".concat((0, _blurRequiredFields2["default"])(identifiers), "\n    ").concat(checkFormIsInvalid(submitButtonIdentifier), "\n  });\n  ");
}