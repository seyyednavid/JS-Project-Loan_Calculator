// UI Vars
const amount = document.querySelector("#amount");
const interest = document.querySelector("#interest");
const years = document.querySelector("#years");
const form = document.querySelector("#loan-form");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");

// Listen for submit
form.addEventListener("submit", function (e) {
  // hide results
  document.querySelector("#results").style.display = "none";
  // show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate result
function calculateResults(e) {
  // console.log(e.target);

  const principle = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculateMonthNumbers = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculateInterest, calculateMonthNumbers);
  const monthly = (principle * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculateMonthNumbers).toFixed(2);
    totalInterest.value = (monthly * calculateMonthNumbers - principle).toFixed(
      2
    );
    // show result
    document.querySelector("#results").style.display = "block";
    // hide loading
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("please check your inputs ");
  }
}

//  show error
function showError(error) {
  // hide results
  document.querySelector("#results").style.display = "none";
  // show loader
  document.querySelector("#loading").style.display = "none";

  //  Create a div
  const errorDiv = document.createElement("div");
  // Get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  //  clear error after 3 second
  setTimeout(clearError, 3000);
}

//  Clear error after 3 s
function clearError() {
  document.querySelector(".alert").remove();
}
