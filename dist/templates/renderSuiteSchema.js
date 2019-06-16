"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderTestSuite;

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

function createTree(Component, props) {
  var testRenderer = _reactTestRenderer2["default"].create(_react2["default"].createElement(_reactRouterDom.MemoryRouter, null, _react2["default"].createElement(Component, props)));

  var testRendererTree = testRenderer.toTree();
  console.log('testRendererTree', testRendererTree);
  var testComponent = testRendererTree.rendered;

  while (testComponent.type.name !== Component.name) {
    testComponent = testComponent.rendered;
  }

  var testRendererInstance = testComponent.instance;
  var testRendererJSON = testRenderer.toJSON();
  return {
    testRendererJSON: testRendererJSON,
    testRendererInstance: testRendererInstance
  };
}

function setDefaultTestProps() {
  var testProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultTestProps = testProps ? (0, _lodash.cloneDeep)(Object.assign((0, _lodash.cloneDeep)(testProps), (0, _lodash.cloneDeep)(defaultProps))) : defaultProps;
  return defaultTestProps;
}

function setTestProps() {
  var initialTestProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!initialTestProps) {
    if (defaultProps) {
      return defaultProps;
    }
  }

  if (!defaultProps) {
    if (initialTestProps) {
      return initialTestProps;
    }
  }

  return (0, _lodash.cloneDeep)(Object.assign((0, _lodash.cloneDeep)(defaultProps), (0, _lodash.cloneDeep)(initialTestProps)));
}

function testFormFields(component, testRendererInstance, testProps, templateProps, identifiers) {
  return identifiers.form.fields.length > 0 ? (0, _validateForm2["default"])(component, testRendererInstance, testProps, templateProps, identifiers) : '';
}

function testDefaultProps(componentDefaultProps, defaultTestProps) {
  if (!(0, _lodash.isEmpty)(componentDefaultProps)) {
    var defaultTemplateProps = (0, _formatProps.formatTemplateProps)(defaultTestProps);
    return (0, _testRenderWithDefaultProps2["default"])(defaultTemplateProps);
  }

  return '';
}

function renderTestSuite(componentPath) {
  console.log('-------------');

  var Component = require(componentPath);

  console.log('COMPONENT', Component);
  var defaultTestProps = setDefaultTestProps(Component.testProps, Component.defaultProps);
  var definedTestProps = setTestProps(Component.testProps, Component.defaultProps);
  var templateProps = (0, _formatProps.formatTemplateProps)(definedTestProps) || '';

  var _createTree = createTree(Component, definedTestProps),
      testRendererJSON = _createTree.testRendererJSON,
      testRendererInstance = _createTree.testRendererInstance;

  var identifiers = (0, _createIdentifiersMap2["default"])(testRendererJSON, componentPath);
  var component = (0, _mountReactComponent2["default"])(Component, definedTestProps);
  var buttonIdentifiers = identifiers.buttons;
  return "\ndescribe('Automated Generated Tests', () => {\n  let component;\n  ".concat(testDefaultProps(Component.defaultProps, defaultTestProps), "\n\n  describe('With custom props', () => {\n    beforeEach(() => {\n      component = mount(\n        <MemoryRouter>\n          <Component ").concat(templateProps, " />\n        </MemoryRouter>\n      ).find('").concat(Component.name, "');\n    });\n    ").concat((0, _testRender2["default"])(), "\n    ").concat((0, _testButtonsBehaviour2["default"])(component, testRendererInstance, definedTestProps, buttonIdentifiers), "\n    ").concat((0, _testAnchorsBehaviour2["default"])(identifiers), "\n    ").concat(testFormFields(component, testRendererInstance, definedTestProps, (0, _formatProps.formatTemplateProps)(defaultTestProps), identifiers), "\n  });\n});\n");
}