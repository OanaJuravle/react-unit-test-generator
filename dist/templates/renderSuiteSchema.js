"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("jsdom-global/register");

require("@babel/polyfill");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactTestRenderer = require("react-test-renderer");

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _testRender = require("./render/testRender");

var _testRender2 = _interopRequireDefault(_testRender);

var _testRenderWithDefaultProps = require("./render/testRenderWithDefaultProps");

var _testRenderWithDefaultProps2 = _interopRequireDefault(_testRenderWithDefaultProps);

var _testButtonsBehaviour = require("./buttons/testButtonsBehaviour");

var _testButtonsBehaviour2 = _interopRequireDefault(_testButtonsBehaviour);

var _testAnchorsBehaviour = require("./anchors/testAnchorsBehaviour");

var _testAnchorsBehaviour2 = _interopRequireDefault(_testAnchorsBehaviour);

var _validateForm = require("./forms/validateForm");

var _validateForm2 = _interopRequireDefault(_validateForm);

var _createIdentifiersMap = require("../createIdentifiersMap");

var _createIdentifiersMap2 = _interopRequireDefault(_createIdentifiersMap);

var _formatProps = require("../helpers/formatProps");

var _mountReactComponent = require("../helpers/mountReactComponent");

var _mountReactComponent2 = _interopRequireDefault(_mountReactComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import UsersIndex from '../../../react-app/src/components/users/Users/UsersIndex.js';
var fs = require('fs'); // function createTree(Component, props) {
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
  console.log('-------------'); // const testRenderer = TestRenderer.create(
  //   <MemoryRouter>
  //     <UsersIndex />
  //   </MemoryRouter>,
  // );
  // const testRendererTree = testRenderer.toTree();
  // console.log('testRendererTree', testRendererTree);

  var Component;
  Component = require(componentPath); // try {
  //   Component = fs.readFileSync(componentPath, 'utf8');
  //   console.log('READ FILE');
  // } catch (err) {
  //   throw err;
  // }

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

exports["default"] = renderTestSuite;