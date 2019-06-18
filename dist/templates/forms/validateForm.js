"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateForm;

var _testValidForm = _interopRequireDefault(require("./testValidForm"));

var _testInvalidForm = _interopRequireDefault(require("./testInvalidForm"));

var _mockMethod = _interopRequireDefault(require("../../helpers/mockMethod"));

var _getMethodMockName = _interopRequireDefault(require("../../helpers/getMethodMockName"));

var _mountComponent = _interopRequireDefault(require("../mountComponent"));

var _warnings = require("../warnings");

var _mountReactComponentWithMocks = _interopRequireDefault(require("../../helpers/mountReactComponentWithMocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validateForm(component, testRendererInstance, testProps, templateProps, identifiers) {
  if (!identifiers.form.identifier) {
    return (0, _warnings.noFormIdentifierSpecified)();
  }

  var submitButtonIdentifier = identifiers.form.submitButton;
  var reactFormElement = component.find("[data-testid=\"".concat(identifiers.form.identifier, "\"]")).at(0);
  var boundedMethod = reactFormElement.props().onSubmit;

  if (!boundedMethod) {
    return;
  }

  boundedMethod = boundedMethod.name.split(' ').slice(-1)[0];

  if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
    var isInstanceMethod = !(testProps && testProps[boundedMethod]);
    var hasRequiredFields = identifiers.form.fields.some(function (field) {
      return field.required;
    });
    var mockFunction = (0, _getMethodMockName["default"])(boundedMethod);
    return "\n      describe('Form validation', () => {\n        let field;\n        ".concat(isInstanceMethod ? 'let spy;' : "let ".concat(mockFunction), "\n        beforeEach(() => {\n          ").concat(isInstanceMethod ? (0, _mockMethod["default"])(boundedMethod, isInstanceMethod) : "".concat(mockFunction, " = jest.fn();"), "\n          ").concat(isInstanceMethod ? (0, _mountComponent["default"])(templateProps) : (0, _mountReactComponentWithMocks["default"])(testProps, boundedMethod), "\n        });\n        \n        afterEach(() => {    \n          jest.clearAllMocks();\n        });\n        ").concat((0, _testValidForm["default"])(submitButtonIdentifier, isInstanceMethod ? boundedMethod : mockFunction, testProps, isInstanceMethod, identifiers), "\n        ").concat(hasRequiredFields ? (0, _testInvalidForm["default"])(submitButtonIdentifier, isInstanceMethod ? boundedMethod : mockFunction, testProps, isInstanceMethod, identifiers) : '', "\n      });");
  }

  return '';
}