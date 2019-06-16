"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testAnchorsBehaviour;

var _warnings = require("../warnings");

function testAnchorsBehaviour(identifiers) {
  var currentPath = [];
  var commonPath;
  var paths = {};
  return identifiers.anchors && identifiers.anchors.map(function (element) {
    currentPath = element.redirectTo.split('/');
    commonPath = currentPath.slice(0, -1).join('/');

    if (!element.identifier) {
      return (0, _warnings.noIdentifierSpecified)(element);
    }

    if (!paths[commonPath]) {
      paths[commonPath] = 1;
      return "\n  it('tests that redirect works correctly on \"".concat(element.text, "\" click', () => {\n      window.history.pushState({}, '', '").concat(element.redirectTo, "');\n      const anchor = component.find('[data-testid=\"").concat(element.identifier, "\"]').at(0);\n      anchor.simulate('click');\n      component.update();\n      expect(window.location.href).toContain('").concat(element.redirectTo, "');\n  });\n        ");
    }
  }).join('');
}