function generalImports(componentPath) {
  return `
  import React from "react";
  import { mount } from "enzyme";
  import { MemoryRouter } from "react-router-dom";
  import Component from "${componentPath}";
  `;
}

export default generalImports;
