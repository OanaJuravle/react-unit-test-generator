"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function generalImports(componentPath) {
  return "\n  import React from \"react\";\n  import { mount } from \"enzyme\";\n  import { MemoryRouter } from \"react-router-dom\";\n  import Component from \"".concat(componentPath, "\";\n  ");
}

exports["default"] = generalImports;