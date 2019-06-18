"use strict";

require("jsdom-global/register");

require("@babel/polyfill");

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _testRender = _interopRequireDefault(require("./render/testRender"));

var _testRenderWithDefaultProps = _interopRequireDefault(require("./render/testRenderWithDefaultProps"));

var _testButtonsBehaviour = _interopRequireDefault(require("./buttons/testButtonsBehaviour"));

var _testAnchorsBehaviour = _interopRequireDefault(require("./anchors/testAnchorsBehaviour"));

var _validateForm = _interopRequireDefault(require("./forms/validateForm"));

var _createIdentifiersMap = _interopRequireDefault(require("../createIdentifiersMap"));

var _formatProps = require("../helpers/formatProps");

var _mountReactComponent = _interopRequireDefault(require("../helpers/mountReactComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  var Component = require(componentPath);

  console.log('COMPONENT', Component); //   const defaultTestProps = setDefaultTestProps(Component.testProps, Component.defaultProps);
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

module.exports = {
  renderTestSuite: renderTestSuite
};