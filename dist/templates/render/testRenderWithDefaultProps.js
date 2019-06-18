"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testRenderWithDefaultProps;

var _mountComponent = _interopRequireDefault(require("../mountComponent"));

var _testRender = _interopRequireDefault(require("./testRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testRenderWithDefaultProps(defaultProps) {
  return "\n  describe('With default props', () => {\n    ".concat((0, _mountComponent["default"])(defaultProps), "\n    ").concat((0, _testRender["default"])(), "\n  });");
}