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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shaders_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders.wgsl */ \"./src/shaders.wgsl\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nconst Initialize = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    var _a;\r\n    const canvas = document.getElementById(\"gfx-main\");\r\n    //adapter: wrapper around (physical) GPU.\r\n    //Describes features and limits\r\n    const adapter = yield ((_a = navigator.gpu) === null || _a === void 0 ? void 0 : _a.requestAdapter());\r\n    //device: wrapper around GPU functionality\r\n    //Function calls are made through the device\r\n    const device = yield (adapter === null || adapter === void 0 ? void 0 : adapter.requestDevice());\r\n    //context: similar to vulkan instance (or OpenGL context)\r\n    const context = canvas.getContext(\"webgpu\");\r\n    const format = \"bgra8unorm\";\r\n    context.configure({\r\n        device: device,\r\n        format: format,\r\n        alphaMode: \"opaque\"\r\n    });\r\n    const bindGroupLayout = device.createBindGroupLayout({\r\n        entries: [],\r\n    });\r\n    const bindGroup = device.createBindGroup({\r\n        layout: bindGroupLayout,\r\n        entries: []\r\n    });\r\n    const pipelineLayout = device.createPipelineLayout({\r\n        bindGroupLayouts: [bindGroupLayout]\r\n    });\r\n    const pipeline = device.createRenderPipeline({\r\n        vertex: {\r\n            module: device.createShaderModule({\r\n                code: _shaders_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n            }),\r\n            entryPoint: \"vs_main\"\r\n        },\r\n        fragment: {\r\n            module: device.createShaderModule({\r\n                code: _shaders_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n            }),\r\n            entryPoint: \"fs_main\",\r\n            targets: [{\r\n                    format: format\r\n                }]\r\n        },\r\n        primitive: {\r\n            topology: \"triangle-list\"\r\n        },\r\n        layout: pipelineLayout\r\n    });\r\n    //command encoder: records draw commands for submission\r\n    const commandEncoder = device.createCommandEncoder();\r\n    //texture view: image view to the color buffer in this case\r\n    const textureView = context.getCurrentTexture().createView();\r\n    //renderpass: holds draw commands, allocated from command encoder\r\n    const renderpass = commandEncoder.beginRenderPass({\r\n        colorAttachments: [{\r\n                view: textureView,\r\n                clearValue: { r: 0.5, g: 0.0, b: 0.25, a: 1.0 },\r\n                loadOp: \"clear\",\r\n                storeOp: \"store\"\r\n            }]\r\n    });\r\n    renderpass.setPipeline(pipeline);\r\n    renderpass.setBindGroup(0, bindGroup);\r\n    renderpass.draw(3, 1, 0, 0);\r\n    renderpass.end();\r\n    device.queue.submit([commandEncoder.finish()]);\r\n});\r\nInitialize();\r\n\n\n//# sourceURL=webpack://npm-test/./src/main.ts?");

/***/ }),

/***/ "./src/shaders.wgsl":
/*!**************************!*\
  !*** ./src/shaders.wgsl ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"struct Fragment {\\r\\n    @builtin(position) Position : vec4<f32>,\\r\\n    @location(0) Color : vec4<f32>\\r\\n};\\r\\n\\r\\n@vertex\\r\\nfn vs_main(@builtin(vertex_index) v_id: u32) -> Fragment {\\r\\n\\r\\n    //pre-bake positions and colors, for now.\\r\\n    var positions = array<vec2<f32>, 3> (\\r\\n        vec2<f32>( 0.0,  0.5),\\r\\n        vec2<f32>(-0.5, -0.5),\\r\\n        vec2<f32>( 0.5, -0.5)\\r\\n    );\\r\\n\\r\\n    var colors = array<vec3<f32>, 3> (\\r\\n        vec3<f32>(1.0, 0.0, 0.0),\\r\\n        vec3<f32>(0.0, 1.0, 0.0),\\r\\n        vec3<f32>(0.0, 0.0, 1.0)\\r\\n    );\\r\\n\\r\\n    var output : Fragment;\\r\\n    output.Position = vec4<f32>(positions[v_id], 0.0, 1.0);\\r\\n    output.Color = vec4<f32>(colors[v_id], 1.0);\\r\\n\\r\\n    return output;\\r\\n}\\r\\n\\r\\n@fragment\\r\\nfn fs_main(@location(0) Color: vec4<f32>) -> @location(0) vec4<f32> {\\r\\n    return Color;\\r\\n}\");\n\n//# sourceURL=webpack://npm-test/./src/shaders.wgsl?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;