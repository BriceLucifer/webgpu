/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hex-verter/library/constants/lookup-tables.js":
/*!***********************************************************!*\
  !*** ./src/hex-verter/library/constants/lookup-tables.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hex_lookup: () => (/* binding */ hex_lookup)\n/* harmony export */ });\nconst hex_lookup = [\r\n    \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"a\", \"b\", \"c\", \"d\", \"e\", \"f\"\r\n];\n\n//# sourceURL=webpack://npm-test/./src/hex-verter/library/constants/lookup-tables.js?");

/***/ }),

/***/ "./src/hex-verter/library/conversions.js":
/*!***********************************************!*\
  !*** ./src/hex-verter/library/conversions.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   binary_to_hex: () => (/* binding */ binary_to_hex),\n/* harmony export */   dec_to_binary: () => (/* binding */ dec_to_binary)\n/* harmony export */ });\nfunction dec_to_binary(number) {\r\n    var digits = [];\r\n\r\n    while (number > 0) {\r\n        var digit = String(number % 2);\r\n        number = (number - (number % 2))/ 2;\r\n        digits.push(digit);\r\n    }\r\n\r\n    return digits.reverse().join(\"\");\r\n}\r\n\r\nfunction binary_to_hex(number) {\r\n    var result = 0;\r\n\r\n    for (let i = 0; i < 4; i++) {\r\n        result += Number(number[i]) * 2**(3 - i);\r\n    }\r\n\r\n    return result;\r\n}\n\n//# sourceURL=webpack://npm-test/./src/hex-verter/library/conversions.js?");

/***/ }),

/***/ "./src/hex-verter/library/formatting.js":
/*!**********************************************!*\
  !*** ./src/hex-verter/library/formatting.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   group_binary: () => (/* binding */ group_binary)\n/* harmony export */ });\nfunction group_binary(number) {\r\n    var digits = [];\r\n\r\n    const number_split = number.split(\"\").reverse();\r\n    var group_count = (number_split.length - (number_split.length % 4)) / 4 + 1;\r\n    if (number_split.length % 4 == 0) {\r\n        group_count -= 1;\r\n    }\r\n\r\n    var group = []\r\n\r\n    for (let i = 0; i < number_split.length; i++) {\r\n        group.push(number_split[i]);\r\n        if (group.length == 4) {\r\n            digits.push(group.reverse().join(\"\"));\r\n            group = [];\r\n        }\r\n    }\r\n\r\n    for (let i = number_split.length; i < 4 * group_count; i++) {\r\n        group.push(\"0\");\r\n        if (group.length == 4) {\r\n            digits.push(group.reverse().join(\"\"));\r\n            group = [];\r\n        }\r\n    }\r\n\r\n    return digits.reverse();\r\n}\n\n//# sourceURL=webpack://npm-test/./src/hex-verter/library/formatting.js?");

/***/ }),

/***/ "./src/hex-verter/main.js":
/*!********************************!*\
  !*** ./src/hex-verter/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _library_constants_lookup_tables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library/constants/lookup-tables */ \"./src/hex-verter/library/constants/lookup-tables.js\");\n/* harmony import */ var _library_conversions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./library/conversions */ \"./src/hex-verter/library/conversions.js\");\n/* harmony import */ var _library_formatting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./library/formatting */ \"./src/hex-verter/library/formatting.js\");\n\r\n\r\n\r\n\r\nconst decimal_input = document.getElementById(\"decimalInput\");\r\nconst conversion_button = document.getElementById(\"convert-button\");\r\nconst binary_step = document.getElementById(\"binary-raw\");\r\nconst grouped_binary_step = document.getElementById(\"binary-grouped\");\r\nconst grouped_hex_step = document.getElementById(\"hexadecimal-grouped\");\r\nconst hex_output = document.getElementById(\"hexadecimal\");\r\n\r\nconst click = () => {\r\n\r\n    const binary = (0,_library_conversions__WEBPACK_IMPORTED_MODULE_1__.dec_to_binary)(Number(decimal_input.value));\r\n    binary_step.innerText = \"binary: \" + binary;\r\n    \r\n    var tempStr = \"grouped: \";\r\n    const grouped_binary = (0,_library_formatting__WEBPACK_IMPORTED_MODULE_2__.group_binary)(binary);\r\n    for (let i = 0; i < grouped_binary.length; i++) {\r\n        tempStr += grouped_binary[i] + \" \";\r\n    }\r\n    grouped_binary_step.innerText = tempStr;\r\n\r\n    tempStr = \"hex (grouped): \";\r\n    for (let i = 0; i < grouped_binary.length; i++) {\r\n        tempStr += String((0,_library_conversions__WEBPACK_IMPORTED_MODULE_1__.binary_to_hex)(grouped_binary[i])) + \" \";\r\n    }\r\n    grouped_hex_step.innerText = tempStr;\r\n\r\n    tempStr = \"final: 0x\";\r\n    for (let i = 0; i < grouped_binary.length; i++) {\r\n        tempStr += String(_library_constants_lookup_tables__WEBPACK_IMPORTED_MODULE_0__.hex_lookup[(0,_library_conversions__WEBPACK_IMPORTED_MODULE_1__.binary_to_hex)(grouped_binary[i])]);\r\n    }\r\n    hex_output.innerText = tempStr;\r\n}\r\n\r\nconversion_button.addEventListener(\"click\", click);\n\n//# sourceURL=webpack://npm-test/./src/hex-verter/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/hex-verter/main.js");
/******/ 	
/******/ })()
;