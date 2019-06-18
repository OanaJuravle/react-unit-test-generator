"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountReactComponent;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});

function mountReactComponent(Component, props) {
  return (0, _enzyme.mount)(_react["default"].createElement(_reactRouterDom.MemoryRouter, null, _react["default"].createElement(Component, props)));
}