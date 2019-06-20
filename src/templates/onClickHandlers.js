import testPropMethod from './buttons/testPropMethod';
import testInstanceMethod from './buttons/testInstanceMethod';
import { noIdentifierSpecified, noInlineMethods, noMethodSpecified } from './warnings';

export default function onClickHandlers(
  element,
  boundedMethod,
  testProps,
  action = 'click',
  hasPositiveAssertion = true,
) {
  if (!element.identifier) {
    return noIdentifierSpecified(element);
  }

  if (testProps && testProps[boundedMethod]) {
    return testPropMethod(element, boundedMethod, testProps, action, hasPositiveAssertion);
  }

  return testInstanceMethod(testProps, element, boundedMethod, action, hasPositiveAssertion);
}
