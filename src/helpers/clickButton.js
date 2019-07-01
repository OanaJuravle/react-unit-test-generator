export default function clickButton(dataTestID, action = 'click') {
  return `
  const button = component.find('button[data-testid="${dataTestID}"]').last();
  button.simulate('${action}');
  `;
}
