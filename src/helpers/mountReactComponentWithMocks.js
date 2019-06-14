import mountComponent from '../templates/mountComponent';
import getMethodMockName from './getMethodMockName';
import { formatTemplateProps } from './formatProps';

export default function mountReactComponentWithMocks(testProps, method) {
  const mockFunction = getMethodMockName(method);
  const formattedProps = {};

  Object.assign(formattedProps, testProps);
  formattedProps[method] = mockFunction;
  return `${mountComponent(formatTemplateProps(formattedProps))}`;
}
