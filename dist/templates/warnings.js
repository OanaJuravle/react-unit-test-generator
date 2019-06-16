"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noIdentifierSpecified = noIdentifierSpecified;
exports.noFormIdentifierSpecified = noFormIdentifierSpecified;
exports.noInlineMethods = noInlineMethods;

function noIdentifierSpecified(element) {
  var label = element.label || element.text;
  window.TEST_GENERATOR_WARNINGS.push({
    element: element,
    failureMessage: 'No identifier specified',
    title: "Attempt to test the click event for the \"".concat(label, "\" ").concat(element.type)
  });
}

function noFormIdentifierSpecified() {
  window.TEST_GENERATOR_WARNINGS.push({
    failureMessage: 'No identifier specified',
    title: "Attempt to test the form functionallity"
  });
}

function noInlineMethods(element) {
  window.TEST_GENERATOR_WARNINGS.push({
    element: element,
    failureMessage: 'Inline onClick declarations are not supported',
    title: "Attempt to test the \"".concat(element.label, "\" button click")
  });
}