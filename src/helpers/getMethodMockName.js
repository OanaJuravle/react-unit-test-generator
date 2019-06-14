export default function getMethodMockName(method) {
  const methodCapitalized = method.charAt(0).toUpperCase() + method.slice(1);
  return `mock${methodCapitalized}`;
}
