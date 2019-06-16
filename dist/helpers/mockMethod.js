"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mockMethod;

function mockMethod(name, isInstanceMethod) {
  var mockFunction = isInstanceMethod ? "spy = jest.spyOn(Component.prototype, '".concat(name, "');") : "const ".concat(name, " = jest.fn();");
  return mockFunction;
}