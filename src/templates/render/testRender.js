export default function testRender() {
  return `
  it('renders correctly', () => {
    expect(component.length).toBe(1);
  });`;
}

// return `
// it('renders component', () => {
// expect(tree).toMatchSnapshot();
// });
// `;
