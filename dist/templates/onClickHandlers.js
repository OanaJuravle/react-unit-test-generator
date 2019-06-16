"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onClickHandlers;

var _testPropMethod = require("./buttons/testPropMethod");

var _testPropMethod2 = _interopRequireDefault(_testPropMethod);

var _testInstanceMethod = require("./buttons/testInstanceMethod");

var _testInstanceMethod2 = _interopRequireDefault(_testInstanceMethod);

var _warnings = require("./warnings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function onClickHandlers(element, boundedMethod, testProps) {
  var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'click';
  var hasPositiveAssertion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  if (!element.identifier) {
    return (0, _warnings.noIdentifierSpecified)(element);
  }

  if (boundedMethod === 'onClick') {
    return (0, _warnings.noInlineMethods)(element);
  }

  if (testProps && testProps[boundedMethod]) {
    return (0, _testPropMethod2["default"])(element, boundedMethod, testProps, action, hasPositiveAssertion);
  }

  return (0, _testInstanceMethod2["default"])(testProps, element, boundedMethod, action, hasPositiveAssertion);
}