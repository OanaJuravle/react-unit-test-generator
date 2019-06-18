"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testButtonsBehaviours;

var _onClickHandlers = _interopRequireDefault(require("../onClickHandlers"));

var _testRedirectToUrl = _interopRequireDefault(require("./testRedirectToUrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testButtonsBehaviours(component, testRendererInstance, testProps, buttonIdentifiers) {
  return buttonIdentifiers.map(function (element) {
    if (element.redirectTo) {
      return (0, _testRedirectToUrl["default"])(element);
    }

    var reactElement = component.find("[data-testid=\"".concat(element.identifier, "\"]")).at(0);
    var boundedMethod = reactElement.props().onClick;

    if (!boundedMethod) {
      return;
    }

    boundedMethod = boundedMethod.name.split(' ').slice(-1)[0];

    if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
      return (0, _onClickHandlers["default"])(element, boundedMethod, testProps, 'click', true);
    }
  }).join('');
}