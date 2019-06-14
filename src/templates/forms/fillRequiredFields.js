function mockInputValue(field) {
  if (field.type === 'email' || field.identifier.toLowerCase().includes('email')) {
    return `{value: 'value@test.co'}`;
  }
  if (field.type === 'checkbox') {
    return `{checked: ${!field.checked}}`;
  }
  return `{value: 'test'}`;
}

export default function fillRequiredFields(identifiers) {
  return `
    ${identifiers &&
      identifiers.form &&
      identifiers.form.fields
        .map(field => {
          return (
            field.identifier &&
            `
    field = component.find('[data-testid="${field.identifier}"] input');
    field.simulate('change', {target: ${mockInputValue(field)}});
        `
          );
        })
        .join('')}`;
}
