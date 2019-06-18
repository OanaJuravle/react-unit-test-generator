import 'jsdom-global/register';
import '@babel/polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { cloneDeep, isEmpty } from 'lodash';
import testRender from './render/testRender';
import testRenderWithDefaultProps from './render/testRenderWithDefaultProps';
import testButtonsBehaviour from './buttons/testButtonsBehaviour';
import testAnchorsBehaviour from './anchors/testAnchorsBehaviour';
import validateForm from './forms/validateForm';
import createIdentifiersMap from '../createIdentifiersMap';
import { formatTemplateProps } from '../helpers/formatProps';
import mountReactComponent from '../helpers/mountReactComponent';

// function createTree(Component, props) {
//   const testRenderer = TestRenderer.create(
//     <MemoryRouter>
//       <Component {...props} />
//     </MemoryRouter>,
//   );
//   const testRendererTree = testRenderer.toTree();

//   console.log('testRendererTree', testRendererTree);

//   let testComponent = testRendererTree.rendered;
//   while (testComponent.type.name !== Component.name) {
//     testComponent = testComponent.rendered;
//   }
//   const testRendererInstance = testComponent.instance;
//   const testRendererJSON = testRenderer.toJSON();
//   return { testRendererJSON, testRendererInstance };
// }

// function setDefaultTestProps(testProps = {}, defaultProps = {}) {
//   let defaultTestProps = testProps
//     ? cloneDeep(Object.assign(cloneDeep(testProps), cloneDeep(defaultProps)))
//     : defaultProps;
//   return defaultTestProps;
// }

// function setTestProps(initialTestProps = {}, defaultProps = {}) {
//   if (!initialTestProps) {
//     if (defaultProps) {
//       return defaultProps;
//     }
//   }
//   if (!defaultProps) {
//     if (initialTestProps) {
//       return initialTestProps;
//     }
//   }
//   return cloneDeep(Object.assign(cloneDeep(defaultProps), cloneDeep(initialTestProps)));
// }

// function testFormFields(component, testRendererInstance, testProps, templateProps, identifiers) {
//   return identifiers.form.fields.length > 0
//     ? validateForm(component, testRendererInstance, testProps, templateProps, identifiers)
//     : '';
// }

// function testDefaultProps(componentDefaultProps, defaultTestProps) {
//   if (!isEmpty(componentDefaultProps)) {
//     const defaultTemplateProps = formatTemplateProps(defaultTestProps);
//     return testRenderWithDefaultProps(defaultTemplateProps);
//   }
//   return '';
// }

function renderTestSuite(componentPath) {
  console.log('-------------');
  const Component = require(componentPath);
  console.log('COMPONENT', Component);

  //   const defaultTestProps = setDefaultTestProps(Component.testProps, Component.defaultProps);
  //   const definedTestProps = setTestProps(Component.testProps, Component.defaultProps);
  //   const templateProps = formatTemplateProps(definedTestProps) || '';

  //   const { testRendererJSON, testRendererInstance } = createTree(Component, definedTestProps);
  //   const identifiers = createIdentifiersMap(testRendererJSON, componentPath);
  //   const component = mountReactComponent(Component, definedTestProps);

  //   const buttonIdentifiers = identifiers.buttons;

  //   return `
  // describe('Automated Generated Tests', () => {
  //   let component;
  //   ${testDefaultProps(Component.defaultProps, defaultTestProps)}

  //   describe('With custom props', () => {
  //     beforeEach(() => {
  //       component = mount(
  //         <MemoryRouter>
  //           <Component ${templateProps} />
  //         </MemoryRouter>
  //       ).find('${Component.name}');
  //     });
  //     ${testRender()}
  //     ${testButtonsBehaviour(component, testRendererInstance, definedTestProps, buttonIdentifiers)}
  //     ${testAnchorsBehaviour(identifiers)}
  //     ${testFormFields(
  //       component,
  //       testRendererInstance,
  //       definedTestProps,
  //       formatTemplateProps(defaultTestProps),
  //       identifiers,
  //     )}
  //   });
  // });
  // `;
}

module.exports = { renderTestSuite };
