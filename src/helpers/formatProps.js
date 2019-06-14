function formatInnerAttributes(formattedProps, key) {
  if (typeof formattedProps[key] === 'function') {
    return `${key}: jest.fn()`;
  }

  if (typeof formattedProps[key] === 'string' && formattedProps[key].startsWith('mock')) {
    return `${key}: ${formattedProps[key]}`;
  }

  return `${key}: ${JSON.stringify(formattedProps[key])}`;
}
export function formatTemplateProps(props) {
  let formattedProps = {};
  Object.assign(formattedProps, props);
  return Object.keys(formattedProps)
    .map(key => {
      if (typeof formattedProps[key] === 'function') {
        return `
          ${key}={jest.fn()}`;
      }
      if (typeof formattedProps[key] === 'string' && formattedProps[key].startsWith('mock')) {
        return `
          ${key}={${formattedProps[key]}}`;
      }
      if (typeof formattedProps[key] === 'object' && !Array.isArray(formattedProps[key])) {
        return `
        ${key}={{${Object.keys(formattedProps[key])
          .map(k => formatInnerAttributes(formattedProps[key], k))
          .join(',')}}}`;
      }
      return `
          ${key}={${JSON.stringify(formattedProps[key])}}`;
    })
    .join('');
}
