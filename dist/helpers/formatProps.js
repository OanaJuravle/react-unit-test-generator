"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTemplateProps = formatTemplateProps;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function formatInnerAttributes(formattedProps, key) {
  if (typeof formattedProps[key] === 'function') {
    return "".concat(key, ": jest.fn()");
  }

  if (typeof formattedProps[key] === 'string' && formattedProps[key].startsWith('mock')) {
    return "".concat(key, ": ").concat(formattedProps[key]);
  }

  return "".concat(key, ": ").concat(JSON.stringify(formattedProps[key]));
}

function formatTemplateProps(props) {
  var formattedProps = {};
  Object.assign(formattedProps, props);
  return Object.keys(formattedProps).map(function (key) {
    if (typeof formattedProps[key] === 'function') {
      return "\n          ".concat(key, "={jest.fn()}");
    }

    if (typeof formattedProps[key] === 'string' && formattedProps[key].startsWith('mock')) {
      return "\n          ".concat(key, "={").concat(formattedProps[key], "}");
    }

    if (_typeof(formattedProps[key]) === 'object' && !Array.isArray(formattedProps[key])) {
      return "\n        ".concat(key, "={{").concat(Object.keys(formattedProps[key]).map(function (k) {
        return formatInnerAttributes(formattedProps[key], k);
      }).join(','), "}}");
    }

    return "\n          ".concat(key, "={").concat(JSON.stringify(formattedProps[key]), "}");
  }).join('');
}