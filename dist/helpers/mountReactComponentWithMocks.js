"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountReactComponentWithMocks;

var _mountComponent = require("../templates/mountComponent");

var _mountComponent2 = _interopRequireDefault(_mountComponent);

var _getMethodMockName = require("./getMethodMockName");

var _getMethodMockName2 = _interopRequireDefault(_getMethodMockName);

var _formatProps = require("./formatProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mountReactComponentWithMocks(testProps, method) {
  var mockFunction = (0, _getMethodMockName2["default"])(method);
  var formattedProps = {};
  Object.assign(formattedProps, testProps);
  formattedProps[method] = mockFunction;
  return "".concat((0, _mountComponent2["default"])((0, _formatProps.formatTemplateProps)(formattedProps)));
}