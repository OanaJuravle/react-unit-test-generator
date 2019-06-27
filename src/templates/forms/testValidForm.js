import fillRequiredFields from './fillRequiredFields';
import { renderTestDescription as instanceMetodTestDescription } from '../buttons/testInstanceMethod';
import { renderTestDescription as propMethodTestDescription } from '../buttons/testPropMethod';
import checkForStateUpdate from '../../helpers/checkForStateUpdate';
import testPropMethod from '../buttons/testPropMethod';

export default function testValidForm(
  submitButtonIdentifier,
  boundedMethod,
  testProps,
  isInstanceMethod,
  identifiers,
  action,
) {
  return `
  it('tests Form Fields - success', () => {
    ${fillRequiredFields(identifiers)}
    ${
      isInstanceMethod
        ? instanceMetodTestDescription(submitButtonIdentifier, action, true)
        : propMethodTestDescription(submitButtonIdentifier, boundedMethod, action, true)
    }
    ${isInstanceMethod ? checkForStateUpdate() : ''}
  });
  `;
}
