"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = clickButton;

function clickButton(dataTestID) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  return "\n  const button = component.find('button[data-testid=\"".concat(dataTestID, "\"]');\n  button.simulate('").concat(action, "');\n  ");
}