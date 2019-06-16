"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkForStateUpdate;

function checkForStateUpdate() {
  return "expect(component.find(Component).instance().state).toMatchSnapshot();";
}