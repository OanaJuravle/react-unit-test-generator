import mountComponent from '../mountComponent';
import testRender from './testRender';

export default function testRenderWithDefaultProps(defaultProps) {
  return `
  describe('With default props', () => {
    ${mountComponent(defaultProps)}
    ${testRender()}
  });
  `;
}
