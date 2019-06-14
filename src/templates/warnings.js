export function noIdentifierSpecified(element) {
  const label = element.label || element.text;

  window.TEST_GENERATOR_WARNINGS.push({
    element,
    failureMessage: 'No identifier specified',
    title: `Attempt to test the click event for the "${label}" ${element.type}`,
  });
}

export function noFormIdentifierSpecified() {
  window.TEST_GENERATOR_WARNINGS.push({
    failureMessage: 'No identifier specified',
    title: `Attempt to test the form functionallity`,
  });
}

export function noInlineMethods(element) {
  window.TEST_GENERATOR_WARNINGS.push({
    element,
    failureMessage: 'Inline onClick declarations are not supported',
    title: `Attempt to test the "${element.label}" button click`,
  });
}
