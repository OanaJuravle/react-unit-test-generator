"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testInstanceMethod;

var _clickButton = require("../../helpers/clickButton");

var _clickButton2 = _interopRequireDefault(_clickButton);

var _checkForStateUpdate = require("../../helpers/checkForStateUpdate");

var _checkForStateUpdate2 = _interopRequireDefault(_checkForStateUpdate);

var _mockMethod = require("../../helpers/mockMethod");

var _mockMethod2 = _interopRequireDefault(_mockMethod);

var _mountComponent = require("../mountComponent");

var _mountComponent2 = _interopRequireDefault(_mountComponent);

var _formatProps = require("../../helpers/formatProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function returnAssertion(hasPositiveAssertion) {
  return hasPositiveAssertion ? "expect(spy).toBeCalled();" : "expect(spy).toHaveBeenCalledTimes(0);";
}

function renderTestSuite(testProps, element, method, action, hasPositiveAssertion) {
  var templateProps = (0, _formatProps.formatTemplateProps)(testProps) || '';
  return "\n\n  it('tests the \"".concat(element.label, "\" button click', () => {\n    let spy;\n    ").concat((0, _mockMethod2["default"])(method, action, true), "\n    ").concat((0, _mountComponent2["default"])(templateProps), "\n    ").concat((0, _clickButton2["default"])(element.identifier, action), "\n    ").concat(returnAssertion(hasPositiveAssertion), "\n    ").concat((0, _checkForStateUpdate2["default"])(), "\n  });");
}

function renderTestDescription(element, method, action, hasPositiveAssertion) {
  return "\n  ".concat((0, _clickButton2["default"])(element.identifier, action), "\n  ").concat(returnAssertion(hasPositiveAssertion), "\n  ");
}

function testInstanceMethod(testProps, element, method, action, hasPositiveAssertion) {
  if (action === 'click') {
    return renderTestSuite(testProps, element, method, action, hasPositiveAssertion);
  }

  return renderTestDescription(element, method, action, hasPositiveAssertion);
}