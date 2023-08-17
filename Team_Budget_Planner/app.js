document.addEventListener("DOMContentLoaded", function () {
  const dealForm = document.getElementById("dealForm");
  const addDealButton = document.getElementById("addDealButton");
  const totalBudgetElement = document.getElementById("totalBudget");
  const dealTableBody = document.getElementById("dealTableBody");

  let totalBudget = 0;

  // Load data from localStorage if available
  const savedTotalBudget = localStorage.getItem("totalBudget");
  if (savedTotalBudget !== null) {
    totalBudget = parseFloat(savedTotalBudget);
    totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;
  }

  // Load deals from localStorage if available
  const savedDeals = JSON.parse(localStorage.getItem("deals")) || [];
  addDealsToTable(savedDeals);

  addDealButton.addEventListener("click", function (event) {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value;
    const projectName = document.getElementById("projectName").value;
    const projectManager = document.getElementById("projectManager").value;
    const projectCost = parseFloat(
      document.getElementById("projectCost").value
    );

    if (clientName && projectName && projectManager && projectCost) {
      totalBudget += projectCost;
      totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
              <td>${clientName}</td>
              <td>${projectName}</td>
              <td>${projectManager}</td>
              <td>$${projectCost.toFixed(2)}</td>
              <td><button class="btn btn-danger btn-sm delete-button">Delete</button></td>
          `;

      newRow
        .querySelector(".delete-button")
        .addEventListener("click", function () {
          totalBudget -= projectCost;
          totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;
          newRow.remove();
          saveTotalBudget();
          saveDealsToLocalStorage();
        });

      dealTableBody.appendChild(newRow);

      // Save data to localStorage
      saveTotalBudget();
      saveDealsToLocalStorage();

      // Clear the form
      dealForm.reset();
    }
  });

  // Function to add deals to the table
  function addDealsToTable(deals) {
    deals.forEach(function (deal) {
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
          totalBudget -= deal.projectCost;
          totalBudgetElement.textContent = `$${totalBudget.toFixed(2)}`;
          newRow.remove();
          saveTotalBudget();
          saveDealsToLocalStorage();
        });

      dealTableBody.appendChild(newRow);
    });
  }

  // Save total budget to localStorage
  function saveTotalBudget() {
    localStorage.setItem("totalBudget", totalBudget.toFixed(2));
  }

  // Save deals to localStorage
  function saveDealsToLocalStorage() {
    const deals = [];
    const rows = dealTableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].getElementsByTagName("td");
      deals.push({
        clientName: columns[0].textContent,
        projectName: columns[1].textContent,
        projectManager: columns[2].textContent,
        projectCost: parseFloat(columns[3].textContent.replace("$", "")),
      });
    }
    localStorage.setItem("deals", JSON.stringify(deals));
  }
});
