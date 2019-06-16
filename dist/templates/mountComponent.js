"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountComponent;

function mountComponent(props) {
  return "component = mount(\n      <MemoryRouter>\n        <Component ".concat(props, " />\n      </MemoryRouter>\n    );");
}