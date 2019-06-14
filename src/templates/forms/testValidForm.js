import fillRequiredFields from './fillRequiredFields';
import testInstanceMethod from '../buttons/testInstanceMethod';
import checkForStateUpdate from '../../helpers/checkForStateUpdate';
import testPropMethod from '../buttons/testPropMethod';

export default function testValidForm(
  submitButtonIdentifier,
  boundedMethod,
  testProps,
  isInstanceMethod,
  identifiers,
) {
  return `
  it('tests Form Fields - success', () => {
    ${fillRequiredFields(identifiers)}
    ${
      isInstanceMethod
        ? testInstanceMethod(testProps, submitButtonIdentifier, boundedMethod, 'submit', true)
        : testPropMethod(submitButtonIdentifier, boundedMethod, testProps, 'submit', true)
    }
    ${isInstanceMethod ? checkForStateUpdate() : ''}
  });
  `;
}
