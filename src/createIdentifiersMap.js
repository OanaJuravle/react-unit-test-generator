const fs = require('fs');

let identifiers = {
  anchors: [],
  buttons: [],
  form: {
    fields: [],
    submitButton: {},
  },
  inputs: [],
};

function depthFirstTraversal(root) {
  let stack = [];
  let node;
  let previousNode;
  let parents = new Set();
  stack.push(root);
  parents.add(root.type);

  while (stack.length) {
    node = stack.shift();

    if (node && node.children) {
      parents.add(node.type);
      stack.unshift(...node.children);

      if (node.type === 'a') {
        let element;
        // case included bellow, on button checks
        if (!node.children.some(child => child.type === 'button')) {
          element = {
            identifier: node.props['data-testid'],
            redirectTo: node.props.href,
            text: node.children && node.children[0],
            type: 'anchor',
          };
          identifiers.anchors.push(element);
        }
      }

      if (node.type === 'button') {
        let element = {
          // onClick method could be either attached to the <button> tag or Button component
          // boundedMethod: node.props.onClick.name.split(' ')[1],
          disabled: node.props.disabled || false,
          identifier: node.props['data-testid'],
          label: node.children[0],
          type: 'button',
        };
        if (previousNode && previousNode.type === 'a') {
          element.redirectTo = previousNode.props.href;
        }
        if (parents.has('form')) {
          switch (node.props.type) {
            case 'submit': {
              identifiers.form.submitButton = element;
              break;
            }
            default: {
              identifiers.buttons.push(element);
              break;
            }
          }
        } else {
          identifiers.buttons.push(element);
        }
      }
      if (node.type === 'form') {
        identifiers.form.identifier = node.props['data-testid'];
      }
    } else {
      if (node.type === 'input') {
        let element = {
          disabled: node.props.disabled || false,
          identifier: node.props['data-testid'] || previousNode.props['data-testid'],
          required: node.props.required || false,
          type: node.props.type,
        };
        if (node.props.type === 'checkbox') {
          element.checked = node.props.checked;
        }
        if (parents.has('form')) {
          identifiers.form.fields.push(element);
        } else {
          identifiers.inputs.push(element);
        }
      }
    }
    previousNode = node;
  }
}

function createIdentifiersMap(tree) {
  depthFirstTraversal(tree);
  return identifiers;
}

export default createIdentifiersMap;
