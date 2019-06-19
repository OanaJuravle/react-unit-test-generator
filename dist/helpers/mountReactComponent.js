"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountReactComponent;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _enzyme = require("enzyme");

var _enzymeAdapterReact = require("enzyme-adapter-react-16");

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact2["default"]()
});

function mountReactComponent(Component, props) {
  return (0, _enzyme.mount)(_react2["default"].createElement(_reactRouterDom.MemoryRouter, null, _react2["default"].createElement(Component, props)));
}