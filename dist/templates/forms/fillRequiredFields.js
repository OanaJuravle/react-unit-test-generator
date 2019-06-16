"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fillRequiredFields;

function mockInputValue(field) {
  if (field.type === 'email' || field.identifier.toLowerCase().includes('email')) {
    return "{value: 'value@test.co'}";
  }

  if (field.type === 'checkbox') {
    return "{checked: ".concat(!field.checked, "}");
  }

  return "{value: 'test'}";
}

function fillRequiredFields(identifiers) {
  return "\n    ".concat(identifiers && identifiers.form && identifiers.form.fields.map(function (field) {
    return field.identifier && "\n    field = component.find('[data-testid=\"".concat(field.identifier, "\"] input');\n    field.simulate('change', {target: ").concat(mockInputValue(field), "});\n        ");
  }).join(''));
}