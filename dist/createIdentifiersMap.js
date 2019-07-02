"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require('fs');

function buttonExistsInList(list, element) {
  return list.buttons.find(function (button) {
    return button.identifier === element.identifier;
  });
}

function getElementLabel(node) {
  var currentChild = node.children[0];
  var i = 0;

  while (currentChild && !currentChild.children && i < 3) {
    if (node.children[i]) {
      currentChild = node.children[i];
    }

    i++;
  }

  while (currentChild && currentChild.children) {
    currentChild = currentChild.children[0];
  }

  if (currentChild.children && typeof currentChild.children[0] !== 'string') {
    return node.props['data-testid'];
  }

  return currentChild;
}

function depthFirstTraversal(root) {
  var identifiers = {
    anchors: [],
    buttons: [],
    form: {
      fields: [],
      submitButton: {}
    },
    inputs: []
  };
  var stack = [];
  var node;
  var previousNode;
  var parents = new Set();
  stack.push(root);
  parents.add(root.type);

  while (stack.length) {
    node = stack.shift();

    if (node && node.children) {
      parents.add(node.type);
      stack.unshift.apply(stack, _toConsumableArray(node.children));

      if (node.type === 'a') {
        var element = void 0; // case included bellow, on button checks

        if (!node.children.some(function (child) {
          return child.type === 'button';
        })) {
          element = {
            identifier: node.props['data-testid'],
            redirectTo: node.props.href,
            text: getElementLabel(node),
            type: 'anchor'
          };
          identifiers.anchors.push(element);
        }
      }

      if (node.type === 'button') {
        var _element = {
          // onClick method could be either attached to the <button> tag or Button component
          // boundedMethod: node.props.onClick.name.split(' ')[1],
          disabled: node.props.disabled || false,
          identifier: node.props['data-testid'],
          label: getElementLabel(node),
          type: 'button'
        };

        if (previousNode && previousNode.type === 'a') {
          _element.redirectTo = previousNode.props.href;
        }

        if (parents.has('form')) {
          switch (node.props.type) {
            case 'submit':
              {
                identifiers.form.submitButton = _element;
                break;
              }

            default:
              {
                if (!buttonExistsInList(identifiers, _element)) {
                  identifiers.buttons.push(_element);
                }

                break;
              }
          }
        } else {
          if (!buttonExistsInList(identifiers, _element)) {
            identifiers.buttons.push(_element);
          }
        }
      }

      if (node.type === 'form') {
        identifiers.form.identifier = node.props['data-testid'];
      }
    } else {
      if (node.type === 'input') {
        var _element2 = {
          disabled: node.props.disabled || false,
          identifier: node.props['data-testid'] || previousNode.props['data-testid'],
          required: node.props.required || false,
          type: node.props.type
        };

        if (node.props.type === 'checkbox') {
          _element2.checked = node.props.checked;
        }

        if (parents.has('form')) {
          identifiers.form.fields.push(_element2);
        } else {
          identifiers.inputs.push(_element2);
        }
      }
    }

    previousNode = node;
  }

  return identifiers;
}

function createIdentifiersMap(tree) {
  return depthFirstTraversal(tree);
}

exports["default"] = createIdentifiersMap;