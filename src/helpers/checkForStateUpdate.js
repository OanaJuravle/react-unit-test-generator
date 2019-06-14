export default function checkForStateUpdate() {
  return `expect(component.find(Component).instance().state).toMatchSnapshot();`;
}
