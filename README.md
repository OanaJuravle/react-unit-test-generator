# react-unit-test-generator

react-unit-test-generator is a helper for writing unit tests for React apps. Its main goal is to automatically generate a suite of the most common test cases for a given component.

Currently, it creates unit tests based on a component's defaultProps but also for custom props set by user on a new property for that component - testProps, declared very similarly to how we already declare defaultProps. It also has support for testing event handlers such as onClick, onChange and onSubmit. You can also define the entry point for your project and the path to the tests directory in a config file, passed as an argument to the command.

### Install

```
npm install --save-dev react-unit-test-generator
```
