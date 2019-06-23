import testValidForm from './testValidForm';
import testInvalidForm from './testInvalidForm';
import mockMethod from '../../helpers/mockMethod';
import getMethodMockName from '../../helpers/getMethodMockName';
import mountComponent from '../mountComponent';
import { noFormIdentifierSpecified } from '../warnings';
import mountReactComponentWithMocks from '../../helpers/mountReactComponentWithMocks';
import { noInlineMethods } from '../warnings';

export default function validateForm(
  component,
  testRendererInstance,
  testProps,
  templateProps,
  identifiers,
) {
  if (!identifiers.form.identifier) {
    return noFormIdentifierSpecified();
  }
  const submitButtonIdentifier = identifiers.form.submitButton;
  const reactFormElement = component.find(`[data-testid="${identifiers.form.identifier}"]`).at(0);
  let boundedMethod = reactFormElement.props().onSubmit;

  if (!boundedMethod) {
    return;
  }

  boundedMethod = boundedMethod.name.split(' ').slice(-1)[0];

  if (boundedMethod === 'onSubmit') {
    return noInlineMethods(submitButtonIdentifier);
  }

  if (testRendererInstance[boundedMethod] || testRendererInstance.props[boundedMethod]) {
    const isInstanceMethod = !(testProps && testProps[boundedMethod]);
    const hasRequiredFields = identifiers.form.fields.some(field => field.required);
    const mockFunction = getMethodMockName(boundedMethod);

    return `
      describe('Form validation', () => {
        let field;
        ${isInstanceMethod ? 'let spy;' : `let ${mockFunction}`}
        beforeEach(() => {
          ${
            isInstanceMethod
              ? mockMethod(boundedMethod, isInstanceMethod)
              : `${mockFunction} = jest.fn();`
          }
          ${
            isInstanceMethod
              ? mountComponent(templateProps)
              : mountReactComponentWithMocks(testProps, boundedMethod)
          }
        });
        
        afterEach(() => {    
          jest.clearAllMocks();
        });
        ${testValidForm(
          submitButtonIdentifier,
          isInstanceMethod ? boundedMethod : mockFunction,
          testProps,
          isInstanceMethod,
          identifiers,
        )}
        ${hasRequiredFields ? testInvalidForm(submitButtonIdentifier, identifiers) : ''}
      });
      `;
  }
  return '';
}
