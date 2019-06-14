import testInstanceMethod from '../buttons/testInstanceMethod';
import testPropMethod from '../buttons/testPropMethod';
import blurRequiredFields from './blurRequiredFields';

export default function testInvalidForm(
  submitButtonIdentifier,
  boundedMethod,
  testProps,
  isInstanceMethod,
  identifiers,
) {
  return `
  it('tests Form Fields - failure', () => {
    ${blurRequiredFields(identifiers)}
    ${
      isInstanceMethod
        ? testInstanceMethod(testProps, submitButtonIdentifier, boundedMethod, 'submit', false)
        : testPropMethod(submitButtonIdentifier, boundedMethod, testProps, 'submit', false)
    }
  });`;
}
