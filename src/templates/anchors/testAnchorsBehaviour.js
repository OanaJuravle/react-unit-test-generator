import { noIdentifierSpecified } from '../warnings';

export default function testAnchorsBehaviour(identifiers) {
  let currentPath = [];
  let commonPath;
  let paths = {};

  return (
    identifiers.anchors &&
    identifiers.anchors
      .map(element => {
        currentPath = element.redirectTo.split('/');
        commonPath = currentPath.slice(0, -1).join('/');

        if (!element.identifier) {
          return noIdentifierSpecified(element);
        }

        if (!paths[commonPath]) {
          paths[commonPath] = 1;
          return `
  it('tests that redirect works correctly on "${element.text}" click', () => {
      window.history.pushState({}, '', '${element.redirectTo}');
      const anchor = component.find('[data-testid="${element.identifier}"]').at(0);
      anchor.simulate('click');
      component.update();
      expect(window.location.href).toContain('${element.redirectTo}');
  });
        `;
        }
      })
      .join('')
  );
}
