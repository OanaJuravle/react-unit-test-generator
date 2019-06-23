import clickButton from '../../helpers/clickButton';
import checkForStateUpdate from '../../helpers/checkForStateUpdate';
import mockMethod from '../../helpers/mockMethod';
import mountComponent from '../mountComponent';
import { formatTemplateProps } from '../../helpers/formatProps';

function returnAssertion(hasPositiveAssertion) {
  return hasPositiveAssertion
    ? `expect(spy).toBeCalled();`
    : `expect(spy).toHaveBeenCalledTimes(0);`;
}

function renderTestSuite(testProps, element, method, action, hasPositiveAssertion) {
  const templateProps = formatTemplateProps(testProps) || '';
  return `

  it('tests the "${element.label}" button click', () => {
    let spy;
    ${mockMethod(method, action, true)}
    ${mountComponent(templateProps)}
    ${clickButton(element.identifier, action)}
    ${returnAssertion(hasPositiveAssertion)}
    ${checkForStateUpdate()}
  });
  `;
}

function renderTestDescription(element, method, action, hasPositiveAssertion) {
  return `
  ${clickButton(element.identifier, action)}
  ${returnAssertion(hasPositiveAssertion)}
  `;
}

export default function testInstanceMethod(
  testProps,
  element,
  method,
  action,
  hasPositiveAssertion,
) {
  if (action === 'click') {
    return renderTestSuite(testProps, element, method, action, hasPositiveAssertion);
  }
  return renderTestDescription(element, method, action, hasPositiveAssertion);
}
