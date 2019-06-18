"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountReactComponentWithMocks;

var _mountComponent = _interopRequireDefault(require("../templates/mountComponent"));

var _getMethodMockName = _interopRequireDefault(require("./getMethodMockName"));

var _formatProps = require("./formatProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mountReactComponentWithMocks(testProps, method) {
  var mockFunction = (0, _getMethodMockName["default"])(method);
  var formattedProps = {};
  Object.assign(formattedProps, testProps);
  formattedProps[method] = mockFunction;
  return "".concat((0, _mountComponent["default"])((0, _formatProps.formatTemplateProps)(formattedProps)));
}