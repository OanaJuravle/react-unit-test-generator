import clickButton from '../../helpers/clickButton';
import { noIdentifierSpecified } from '../warnings';

export default function testRedirectToUrl(element) {
  if (!element.identifier) {
    return noIdentifierSpecified(element);
  }
  return `
  it('redirects to "${element.redirectTo}" on "${element.label}" button click', () => {
    window.history.pushState({}, '', '${element.redirectTo}');
    ${clickButton(element.identifier)}
    component.update();
    expect(window.location.href).toContain('${element.redirectTo}');
  });
  `;
}
