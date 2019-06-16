"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMethodMockName;

function getMethodMockName(method) {
  var methodCapitalized = method.charAt(0).toUpperCase() + method.slice(1);
  return "mock".concat(methodCapitalized);
}