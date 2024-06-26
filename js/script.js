// js for tooltip
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
// Function to check if the input value is a valid number
function isValidNumber(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

// code for checking that if user entered any characters or not instead of numbers
document.addEventListener("DOMContentLoaded", function () {
  const incomeInputs = document.querySelectorAll(
    ".gross-income-input, .add-income-input, .deductions-income-input"
  );
  const submitButton = document.querySelector(".submit");

  incomeInputs.forEach(function (incomeInput) {
    incomeInput.addEventListener("input", function (event) {
      const inputValue = event.target.value;
      const alertIcons =
        event.target.parentElement.querySelector(".alert-icon");

      if (!isValidNumber(inputValue)) {
        alertIcons.style.display = "inline-block";
        submitButton.disabled = true;
      } else {
        alertIcons.style.display = "none";
        submitButton.disabled = false;
      }
    });
  });
});

// Code for tax calculation
document.addEventListener("DOMContentLoaded", function () {
  const ageInputs = document.querySelectorAll(".age-input");
  const submitButton = document.getElementById("openModal");

  // function to check if the age input is selected
  function isAgeSelected() {
    for (let i = 0; i < ageInputs.length; i++) {
      if (ageInputs[i].value !== "") {
        return true;
      }
    }
    return false;
  }
  submitButton.addEventListener("click", function () {
    const modal = document.getElementById("myModal");
    const overlay = document.querySelector(".overlay");
    let closebtn = document.querySelector(".closebtn");

    // Function to open the modal
    function openModal() {
      modal.classList.add("active");
      modal.classList.add("display");
      overlay.classList.add("display");
    }

    // Function to close the modal
    function closeModal() {
      modal.classList.remove("active");
      modal.classList.remove("display");
      overlay.classList.remove("display");
      window.location.reload();
    }

    // Check if the age input is selected
    if (!isAgeSelected()) {
      const ageInputs = document.querySelectorAll(".age-input");
      const errorIcons = document.querySelectorAll(".alert-icon");
      for (let i = 0; i < ageInputs.length; i++) {
        if (ageInputs[i].value !== "") {
          // Hide error icons
          errorIcons.forEach(function (icon) {
            icon.style.display = "none";
          });
          return true;
        }
      }

      // If no age is selected, show error icons
      errorIcons.forEach(function (icon, index) {
        if (index === 2) {
          icon.style.display = "inline-block";
        }
      });

      return false;
    } else {
      const errorIcons = document.querySelectorAll(".alert-icon");
      errorIcons.forEach(function (icon, index) {
        if (index === 2) {
          icon.style.display = "none";
        }
      });
      overlay.addEventListener("click", closeModal);
      closebtn.addEventListener("click", closeModal);
      submitButton.addEventListener("click", openModal);
      // Getting input values
      const grossIncomeInput = document.querySelector(".gross-income-input");
      const extraIncomeInput = document.querySelector(".add-income-input");
      const ageInput = document.querySelector(".age-input");
      const deductionsInput = document.querySelector(
        ".deductions-income-input"
      );

      // Calculating the overall income after deductions
      let overallIncome =
        parseFloat(grossIncomeInput.value) +
        parseFloat(extraIncomeInput.value) -
        parseFloat(deductionsInput.value);

      const age = ageInput.value;
      // Tax Calculation
      if (overallIncome <= 800000) {
        overallIncome = `${overallIncome} No tax`;
      } else {
        let taxRate;
        if (age === "<40") {
          taxRate = 0.3;
        } else if (age === ">= 40 & age < 60") {
          taxRate = 0.4;
        } else {
          taxRate = 0.1;
        }
        const taxableIncome = overallIncome - 800000;
        const taxAmount = taxRate * taxableIncome;
        overallIncome -= taxAmount;
      }

      // Display the modal
      modal.classList.add("active");
      overlay.classList.add("display");

      // Displaying the overallIncome of a person in a modal
      const modalTitle = document.querySelector(".sub-title");
      try {
        modalTitle.textContent = `${overallIncome.toFixed(2)}`; 
      } catch (error) {
        modalTitle.textContent = `${overallIncome}`;
      }

      // Clearing input fields
      grossIncomeInput.value = "";
      extraIncomeInput.value = "";
      ageInput.value = "";
      deductionsInput.value = "";
    }
  });
});
