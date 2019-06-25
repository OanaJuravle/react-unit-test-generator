"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testButtonsBehaviours;

var _onClickHandlers = require("../onClickHandlers");

var _onClickHandlers2 = _interopRequireDefault(_onClickHandlers);

var _testRedirectToUrl = require("./testRedirectToUrl");

var _testRedirectToUrl2 = _interopRequireDefault(_testRedirectToUrl);

var _warnings = require("../warnings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function testButtonsBehaviours(component, testRendererInstance, testProps, buttonIdentifiers) {
  return buttonIdentifiers.map(function (element) {
    if (!element.identifier) {
      return noIdentifierSpecified(element);
    }

    if (element.redirectTo) {
      return (0, _testRedirectToUrl2["default"])(element);
    }

    var reactElement = component.find("[data-testid=\"".concat(element.identifier, "\"]")).at(0);
    var boundedMethod = reactElement.props().onClick;

    if (!boundedMethod) {
      return;
    }

    boundedMethod = boundedMethod.name.split(' ').slice(-1)[0];

    if (boundedMethod === 'onClick') {
      return (0, _warnings.noInlineMethods)(element);
    }

    if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
      return (0, _onClickHandlers2["default"])(element, boundedMethod, testProps, 'click', true);
    }
  }).join('');
}