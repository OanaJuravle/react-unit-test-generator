"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fillRequiredFields;

var _warnings = require("../warnings");

var _finalForm = require("final-form");

function mockInputValue(field) {
  if (field.type === 'email' || field.identifier.toLowerCase().includes('email')) {
    return "{value: 'value@test.co'}";
  }

  if (field.type === 'checkbox') {
    return "{checked: ".concat(!field.checked, "}");
  }

  if (field.type === 'number') {
    return "{value: 4}";
  }

  return "{value: 'test'}";
}

function fillRequiredFields(identifiers) {
  console.log(identifiers.form.field);
  return "\n    ".concat(identifiers && identifiers.form && identifiers.form.fields.map(function (field) {
    if (field.required && !field.identifier) {
      return (0, _warnings.noFieldIdentifier)();
    }

    return field.identifier && "\n            field = component.find('[data-testid=\"".concat(field.identifier, "\"]').last();\n            field.simulate('change', {target: ").concat(mockInputValue(field), "});\n            ");
  }).join(''));
}