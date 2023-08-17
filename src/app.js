const Deal = require("./deal");

document.addEventListener("DOMContentLoaded", function () {
  const dealForm = document.getElementById("dealForm");
  const addDealButton = document.getElementById("addDealButton");
  const totalBudgetElement = document.getElementById("totalBudget");
  const dealTableBody = document.getElementById("dealTableBody");

  let totalBudget = 0;
  let deals = [];

  addDealButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value;
    const projectName = document.getElementById("projectName").value;
    const projectManager = document.getElementById("projectManager").value;
    const projectCost = parseFloat(
      document.getElementById("projectCost").value
    );

    if (clientName && projectName && projectManager && projectCost) {
      const newDeal = new Deal(
        clientName,
        projectName,
        projectManager,
        projectCost
      );
      deals.push(newDeal);

      // Update UI
      updateUI();

      // Save deals to localStorage and update total budget
      saveDealsToLocalStorage();
      saveTotalBudget();

      // Clear the form
      dealForm.reset();
    }
  });

  // Function to update UI with deals and total budget
  function updateUI() {
    dealTableBody.innerHTML = "";
    totalBudget = 0; // Reset the total budget before recalculating

    deals.forEach(function (deal) {
      totalBudget += deal.projectCost; // Calculate total budget

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
            <td>${deal.clientName}</td>
            <td>${deal.projectName}</td>
            <td>${deal.projectManager}</td>
            <td>$${deal.projectCost.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm delete-button">Delete</button></td>
        `;

      newRow
        .querySelector(".delete-button")
        .addEventListener("click", function () {
          const dealIndex = deals.indexOf(deal);
          totalBudget -= deal.projectCost;
          deals.splice(dealIndex, 1);
          updateUI();
          saveTotalBudget();
          saveDealsToLocalStorage();
        });

      dealTableBody.appendChild(newRow);
    });

    totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;
  }

  // Function to save deals to localStorage
  function saveDealsToLocalStorage() {
    localStorage.setItem("deals", JSON.stringify(deals));
  }

  // Function to save total budget to localStorage
  function saveTotalBudget() {
    localStorage.setItem("totalBudget", totalBudget.toFixed(2));
  }

  // Load data from localStorage on page load
  function loadFromLocalStorage() {
    const savedTotalBudget = localStorage.getItem("totalBudget");
    const savedDeals = JSON.parse(localStorage.getItem("deals")) || [];

    if (savedTotalBudget !== null) {
      totalBudget = parseFloat(savedTotalBudget);
      totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;
    }

    deals = savedDeals;
    updateUI();
  }

  loadFromLocalStorage();
});
