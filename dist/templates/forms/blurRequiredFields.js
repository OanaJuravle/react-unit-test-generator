"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = blurRequiredFields;

function blurRequiredFields(identifiers) {
  return "\n      ".concat(identifiers && identifiers.form && identifiers.form.fields.map(function (field) {
    if (field.required) {
      return "\n    field = component.find('[data-testid=\"".concat(field.identifier, "\"]').last();\n    field.simulate('focus');\n    field.simulate('blur');\n                  ");
    }
  }).join(''));
}