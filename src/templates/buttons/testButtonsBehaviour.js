import onClickHandlers from '../onClickHandlers';
import testRedirectToUrl from './testRedirectToUrl';
import { noInlineMethods, noIdentifierSpecified } from '../warnings';

export default function testButtonsBehaviours(
  component,
  testRendererInstance,
  testProps,
  buttonIdentifiers,
) {
  return buttonIdentifiers
    .map(element => {
      if (!element.identifier) {
        return noIdentifierSpecified(element);
      }

      if (element.redirectTo) {
        return testRedirectToUrl(element);
      }

      const reactElement = component.find(`[data-testid="${element.identifier}"]`).at(0);
      let boundedMethod = reactElement.props().onClick;
      if (!boundedMethod) {
        return;
      }

      boundedMethod = boundedMethod.name.split(' ').slice(-1)[0];

      if (boundedMethod === 'onClick') {
        return noInlineMethods(element);
      }

      if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
        return onClickHandlers(element, boundedMethod, testProps, 'click', true);
      }
    })
    .join('');
}
