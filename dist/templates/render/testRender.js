"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testRender;

function testRender() {
  return "\n  it('renders correctly', () => {\n    expect(component.length).toBe(1);\n  });\n  ";
} // return `
// it('renders component', () => {
// expect(tree).toMatchSnapshot();
// });
// `;