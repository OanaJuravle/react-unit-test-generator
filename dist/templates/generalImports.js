"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function generalImports(componentPath) {
  return "import React from \"react\";\nimport { mount } from \"enzyme\";\nimport { MemoryRouter } from 'react-router-dom';\nimport Component from '".concat(componentPath, "';    \n  ");
}

exports["default"] = generalImports;