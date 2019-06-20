"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateForm;

var _testValidForm = require("./testValidForm");

var _testValidForm2 = _interopRequireDefault(_testValidForm);

var _testInvalidForm = require("./testInvalidForm");

var _testInvalidForm2 = _interopRequireDefault(_testInvalidForm);

var _mockMethod = require("../../helpers/mockMethod");

var _mockMethod2 = _interopRequireDefault(_mockMethod);

var _getMethodMockName = require("../../helpers/getMethodMockName");

var _getMethodMockName2 = _interopRequireDefault(_getMethodMockName);

var _mountComponent = require("../mountComponent");

var _mountComponent2 = _interopRequireDefault(_mountComponent);

var _warnings = require("../warnings");

var _mountReactComponentWithMocks = require("../../helpers/mountReactComponentWithMocks");

var _mountReactComponentWithMocks2 = _interopRequireDefault(_mountReactComponentWithMocks);

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

  if (boundedMethod === 'onSubmit') {
    return (0, _warnings.noInlineMethods)(submitButtonIdentifier);
  }

  if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
    var isInstanceMethod = !(testProps && testProps[boundedMethod]);
    var hasRequiredFields = identifiers.form.fields.some(function (field) {
      return field.required;
    });
    var mockFunction = (0, _getMethodMockName2["default"])(boundedMethod);
    return "\n      describe('Form validation', () => {\n        let field;\n        ".concat(isInstanceMethod ? 'let spy;' : "let ".concat(mockFunction), "\n        beforeEach(() => {\n          ").concat(isInstanceMethod ? (0, _mockMethod2["default"])(boundedMethod, isInstanceMethod) : "".concat(mockFunction, " = jest.fn();"), "\n          ").concat(isInstanceMethod ? (0, _mountComponent2["default"])(templateProps) : (0, _mountReactComponentWithMocks2["default"])(testProps, boundedMethod), "\n        });\n        \n        afterEach(() => {    \n          jest.clearAllMocks();\n        });\n        ").concat((0, _testValidForm2["default"])(submitButtonIdentifier, isInstanceMethod ? boundedMethod : mockFunction, testProps, isInstanceMethod, identifiers), "\n        ").concat(hasRequiredFields ? (0, _testInvalidForm2["default"])(submitButtonIdentifier, identifiers) : '', "\n      });");
  }

  return '';
}