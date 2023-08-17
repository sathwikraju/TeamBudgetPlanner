/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Deal = __webpack_require__(/*! ./deal */ \"./src/deal.js\");\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n  const dealForm = document.getElementById(\"dealForm\");\r\n  const addDealButton = document.getElementById(\"addDealButton\");\r\n  const totalBudgetElement = document.getElementById(\"totalBudget\");\r\n  const dealTableBody = document.getElementById(\"dealTableBody\");\r\n\r\n  let totalBudget = 0;\r\n  let deals = [];\r\n\r\n  addDealButton.addEventListener(\"click\", async function (event) {\r\n    event.preventDefault();\r\n\r\n    const clientName = document.getElementById(\"clientName\").value;\r\n    const projectName = document.getElementById(\"projectName\").value;\r\n    const projectManager = document.getElementById(\"projectManager\").value;\r\n    const projectCost = parseFloat(\r\n      document.getElementById(\"projectCost\").value\r\n    );\r\n\r\n    if (clientName && projectName && projectManager && projectCost) {\r\n      const newDeal = new Deal(\r\n        clientName,\r\n        projectName,\r\n        projectManager,\r\n        projectCost\r\n      );\r\n      deals.push(newDeal);\r\n\r\n      // Update UI\r\n      updateUI();\r\n\r\n      // Save deals to localStorage and update total budget\r\n      saveDealsToLocalStorage();\r\n      saveTotalBudget();\r\n\r\n      // Clear the form\r\n      dealForm.reset();\r\n    }\r\n  });\r\n\r\n  // Function to update UI with deals and total budget\r\n  function updateUI() {\r\n    dealTableBody.innerHTML = \"\";\r\n    totalBudget = 0; // Reset the total budget before recalculating\r\n\r\n    deals.forEach(function (deal) {\r\n      totalBudget += deal.projectCost; // Calculate total budget\r\n\r\n      const newRow = document.createElement(\"tr\");\r\n      newRow.innerHTML = `\r\n            <td>${deal.clientName}</td>\r\n            <td>${deal.projectName}</td>\r\n            <td>${deal.projectManager}</td>\r\n            <td>$${deal.projectCost.toFixed(2)}</td>\r\n            <td><button class=\"btn btn-danger btn-sm delete-button\">Delete</button></td>\r\n        `;\r\n\r\n      newRow\r\n        .querySelector(\".delete-button\")\r\n        .addEventListener(\"click\", function () {\r\n          const dealIndex = deals.indexOf(deal);\r\n          totalBudget -= deal.projectCost;\r\n          deals.splice(dealIndex, 1);\r\n          updateUI();\r\n          saveTotalBudget();\r\n          saveDealsToLocalStorage();\r\n        });\r\n\r\n      dealTableBody.appendChild(newRow);\r\n    });\r\n\r\n    totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;\r\n  }\r\n\r\n  // Function to save deals to localStorage\r\n  function saveDealsToLocalStorage() {\r\n    localStorage.setItem(\"deals\", JSON.stringify(deals));\r\n  }\r\n\r\n  // Function to save total budget to localStorage\r\n  function saveTotalBudget() {\r\n    localStorage.setItem(\"totalBudget\", totalBudget.toFixed(2));\r\n  }\r\n\r\n  // Load data from localStorage on page load\r\n  function loadFromLocalStorage() {\r\n    const savedTotalBudget = localStorage.getItem(\"totalBudget\");\r\n    const savedDeals = JSON.parse(localStorage.getItem(\"deals\")) || [];\r\n\r\n    if (savedTotalBudget !== null) {\r\n      totalBudget = parseFloat(savedTotalBudget);\r\n      totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;\r\n    }\r\n\r\n    deals = savedDeals;\r\n    updateUI();\r\n  }\r\n\r\n  loadFromLocalStorage();\r\n});\r\n\n\n//# sourceURL=webpack://deal-management/./src/app.js?");

/***/ }),

/***/ "./src/deal.js":
/*!*********************!*\
  !*** ./src/deal.js ***!
  \*********************/
/***/ ((module) => {

eval("// deal.js\r\n\r\n// Create a constructor function for Deal objects\r\nfunction Deal(clientName, projectName, projectManager, projectCost) {\r\n  this.clientName = clientName;\r\n  this.projectName = projectName;\r\n  this.projectManager = projectManager;\r\n  this.projectCost = projectCost;\r\n}\r\n\r\n// Add a method to the prototype to calculate the total cost\r\nDeal.prototype.getTotalCost = function () {\r\n  return this.projectCost;\r\n};\r\n\r\nmodule.exports = Deal;\r\n\n\n//# sourceURL=webpack://deal-management/./src/deal.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;