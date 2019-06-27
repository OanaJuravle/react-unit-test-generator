import { noFieldIdentifier } from '../warnings';
import { fieldSubscriptionItems } from 'final-form';

function mockInputValue(field) {
  if (field.type === 'email' || field.identifier.toLowerCase().includes('email')) {
    return `{value: 'value@test.co'}`;
  }
  if (field.type === 'checkbox') {
    return `{checked: ${!field.checked}}`;
  }

  if (field.type === 'number') {
    return `{value: 4}`;
  }
  return `{value: 'test'}`;
}

export default function fillRequiredFields(identifiers) {
  console.log(identifiers.form.field);
  return `
    ${identifiers &&
      identifiers.form &&
      identifiers.form.fields
        .map(field => {
          if (field.required && !field.identifier) {
            return noFieldIdentifier();
          }
          return (
            field.identifier &&
            `
            field = component.find('[data-testid="${field.identifier}"]').last();
            field.simulate('change', {target: ${mockInputValue(field)}});
            `
          );
        })
        .join('')}`;
}
