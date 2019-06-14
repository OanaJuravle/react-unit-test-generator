export default function mockMethod(name, isInstanceMethod) {
  let mockFunction = isInstanceMethod
    ? `spy = jest.spyOn(Component.prototype, '${name}');`
    : `const ${name} = jest.fn();`;
  return mockFunction;
}
