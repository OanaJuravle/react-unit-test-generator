console.log("*************");
// import generalImports from "./src/templates/generalImports";
// import getFiles from "./src/getFiles";
// import renderTestSuite from "./src/templates/renderSuiteSchema";

// import { Config } from "@jest/types";
// import path from "path";
// const fs = require("fs");

// window.TEST_GENERATOR_WARNINGS = [];
// const packageName = process.env.npm_package_name;
// const configFile = process.env.npm_config_config;
// const fileName = process.argv[process.argv.length - 1];
// const matchedFiles = [];
// const configData = require(`../${packageName}/${configFile}`);
// console.log("*************************", configData);

// // TODO: decide whether or not I should use src here - maybe ask for entry point?
// const files = getFiles(`../${packageName}/src`, matchedFiles, fileName);

// // const componentPath = files[0];
// // ../react-app/src/components/users/Users/UsersIndex.js

// const componentPath = "src/components/users/Users/UsersIndex.js";

// const destination = componentPath
//   .split("/")
//   .slice(-1)[0]
//   .split(".")[0];

// const destinationFile = `D:/Licenta/${packageName}/tests/${destination}.test.js`;

// fs.writeFile(destinationFile, generalImports(componentPath), err => {
//   if (err) throw err;
//   console.log("Added imports");
// });

// fs.appendFile(destinationFile, renderTestSuite(componentPath), err => {
//   if (err) throw err;
//   console.log("Added test suite");
// });

// // try {
// //   fs.writeFileSync(
// //     "testGenerator/testGeneratorWarnings.js",
// //     `module.exports = ${JSON.stringify(window.TEST_GENERATOR_WARNINGS)}`
// //   );
// //   console.log("Added warnings");
// // } catch (err) {
// //   throw err;
// // }
