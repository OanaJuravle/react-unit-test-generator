import clickButton from '../../helpers/clickButton';
import mountReactComponentWithMocks from '../../helpers/mountReactComponentWithMocks';
import getMethodMockName from '../../helpers/getMethodMockName';

function returnAssertion(method, hasPositiveAssertion) {
  return hasPositiveAssertion
    ? `expect(${method}).toBeCalled();`
    : `expect(${method}).toHaveBeenCalledTimes(0);`;
}

function renderTestSuite(element, testProps, boundedMethod, action, hasPositiveAssertion) {
  const mockFunction = getMethodMockName(boundedMethod);
  return `
  it('tests the "${element.label}" button click', () => {
    const ${mockFunction} = jest.fn();
    ${mountReactComponentWithMocks(testProps, boundedMethod)}
    ${clickButton(element.identifier, action)}
    ${returnAssertion(mockFunction, hasPositiveAssertion)}
  });
  `;
}

function renderTestDescription(element, mockFunction, action, hasPositiveAssertion) {
  return `
    ${clickButton(element.identifier, action)}
    ${returnAssertion(mockFunction, hasPositiveAssertion)}
  `;
}

export default function testPropMethod(
  element,
  mockFunction,
  testProps,
  action,
  hasPositiveAssertion,
) {
  if (action === 'click') {
    return renderTestSuite(element, testProps, mockFunction, action, hasPositiveAssertion);
  }
  return renderTestDescription(element, mockFunction, action, hasPositiveAssertion);
}
