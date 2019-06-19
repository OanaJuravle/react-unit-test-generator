"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testPropMethod;

var _clickButton = require("../../helpers/clickButton");

var _clickButton2 = _interopRequireDefault(_clickButton);

var _mountReactComponentWithMocks = require("../../helpers/mountReactComponentWithMocks");

var _mountReactComponentWithMocks2 = _interopRequireDefault(_mountReactComponentWithMocks);

var _getMethodMockName = require("../../helpers/getMethodMockName");

var _getMethodMockName2 = _interopRequireDefault(_getMethodMockName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function returnAssertion(method, hasPositiveAssertion) {
  return hasPositiveAssertion ? "expect(".concat(method, ").toBeCalled();") : "expect(".concat(method, ").toHaveBeenCalledTimes(0);");
}

function renderTestSuite(element, testProps, boundedMethod, action, hasPositiveAssertion) {
  var mockFunction = (0, _getMethodMockName2["default"])(boundedMethod);
  return "\n  it('tests the \"".concat(element.label, "\" button click', () => {\n    const ").concat(mockFunction, " = jest.fn();\n    ").concat((0, _mountReactComponentWithMocks2["default"])(testProps, boundedMethod), "\n    ").concat((0, _clickButton2["default"])(element.identifier, action), "\n    ").concat(returnAssertion(mockFunction, hasPositiveAssertion), "\n  });\n  ");
}

function renderTestDescription(element, mockFunction, action, hasPositiveAssertion) {
  return "\n    ".concat((0, _clickButton2["default"])(element.identifier, action), "\n    ").concat(returnAssertion(mockFunction, hasPositiveAssertion), "\n  ");
}

function testPropMethod(element, mockFunction, testProps, action, hasPositiveAssertion) {
  if (action === 'click') {
    return renderTestSuite(element, testProps, mockFunction, action, hasPositiveAssertion);
  }

  return renderTestDescription(element, mockFunction, action, hasPositiveAssertion);
}