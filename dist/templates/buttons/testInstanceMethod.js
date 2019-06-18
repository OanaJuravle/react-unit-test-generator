"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testInstanceMethod;

var _clickButton = _interopRequireDefault(require("../../helpers/clickButton"));

var _checkForStateUpdate = _interopRequireDefault(require("../../helpers/checkForStateUpdate"));

var _mockMethod = _interopRequireDefault(require("../../helpers/mockMethod"));

var _mountComponent = _interopRequireDefault(require("../mountComponent"));

var _formatProps = require("../../helpers/formatProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function returnAssertion(hasPositiveAssertion) {
  return hasPositiveAssertion ? "expect(spy).toBeCalled();" : "expect(spy).toHaveBeenCalledTimes(0);";
}

function renderTestSuite(testProps, element, method, action, hasPositiveAssertion) {
  var templateProps = (0, _formatProps.formatTemplateProps)(testProps) || '';
  return "\n\n  it('tests the \"".concat(element.label, "\" button click', () => {\n    let spy;\n    ").concat((0, _mockMethod["default"])(method, action, true), "\n    ").concat((0, _mountComponent["default"])(templateProps), "\n    ").concat((0, _clickButton["default"])(element.identifier, action), "\n    ").concat(returnAssertion(hasPositiveAssertion), "\n    ").concat((0, _checkForStateUpdate["default"])(), "\n  });");
}

function renderTestDescription(element, method, action, hasPositiveAssertion) {
  return "\n  ".concat((0, _clickButton["default"])(element.identifier, action), "\n  ").concat(returnAssertion(hasPositiveAssertion), "\n  ");
}

function testInstanceMethod(testProps, element, method, action, hasPositiveAssertion) {
  if (action === 'click') {
    return renderTestSuite(testProps, element, method, action, hasPositiveAssertion);
  }

  return renderTestDescription(element, method, action, hasPositiveAssertion);
}