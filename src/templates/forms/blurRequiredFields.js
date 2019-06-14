export default function blurRequiredFields(identifiers) {
  return `
      ${identifiers &&
        identifiers.form &&
        identifiers.form.fields
          .map(field => {
            if (field.required) {
              return `
    field = component.find('[data-testid="${field.identifier}"]').hostNodes();
    field.simulate('focus');
    field.simulate('blur');
                  `;
            }
          })
          .join('')}`;
}
