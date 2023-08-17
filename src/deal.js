// deal.js

// Create a constructor function for Deal objects
function Deal(clientName, projectName, projectManager, projectCost) {
  this.clientName = clientName;
  this.projectName = projectName;
  this.projectManager = projectManager;
  this.projectCost = projectCost;
}

// Add a method to the prototype to calculate the total cost
Deal.prototype.getTotalCost = function () {
  return this.projectCost;
};

module.exports = Deal;
