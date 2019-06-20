#!/usr/bin/env node
"use strict";

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

module.exports = require('./createTests.js');