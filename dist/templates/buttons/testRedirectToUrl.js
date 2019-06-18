"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testRedirectToUrl;

var _clickButton = _interopRequireDefault(require("../../helpers/clickButton"));

var _warnings = require("../warnings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testRedirectToUrl(element) {
  if (!element.identifier) {
    return (0, _warnings.noIdentifierSpecified)(element);
  }

  return "\n  it('redirects to \"".concat(element.redirectTo, "\" on \"").concat(element.label, "\" button click', () => {\n    window.history.pushState({}, '', '").concat(element.redirectTo, "');\n    ").concat((0, _clickButton["default"])(element.identifier), "\n    component.update();\n    expect(window.location.href).toContain('").concat(element.redirectTo, "');\n  });");
}