import blurRequiredFields from './blurRequiredFields';

function checkFormIsInvalid(submitButtonIdentifier) {
  if (submitButtonIdentifier.disabled === true) {
    return `
    const button = component.find('button[data-testid="${submitButtonIdentifier.identifier}"]');
    expect(button.props().disabled).toBeTruthy();`;
  }
  return checkForErrors();
}

function checkForErrors() {
  return `expect(component.find(form).find('.error').length).toBeGreaterThanOrEqual(1)`;
}

export default function testInvalidForm(submitButtonIdentifier, identifiers) {
  return `
  it('tests Form Fields - failure', () => {
    ${blurRequiredFields(identifiers)}
    ${checkFormIsInvalid(submitButtonIdentifier)}
  });`;
}
