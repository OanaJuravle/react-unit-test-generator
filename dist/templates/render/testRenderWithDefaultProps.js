"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testRenderWithDefaultProps;

var _mountComponent = require("../mountComponent");

var _mountComponent2 = _interopRequireDefault(_mountComponent);

var _testRender = require("./testRender");

var _testRender2 = _interopRequireDefault(_testRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testRenderWithDefaultProps(defaultProps) {
  return "\n  describe('With default props', () => {\n    ".concat((0, _mountComponent2["default"])(defaultProps), "\n    ").concat((0, _testRender2["default"])(), "\n  });");
}