export default function clickButton(dataTestID, action = 'click') {
  return `
  const button = component.find('button[data-testid="${dataTestID}"]');
  button.simulate('${action}');
  `;
}
