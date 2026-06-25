// Even and Odd Number Checker - script.js

function checkEvenOdd() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('number').value;
  
  // Validation: Check if input is empty or invalid
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid integer.</p>";
    return;
  }
  
  var num = parseFloat(rawValue);
  
  // Validation: Decimal values not allowed
  if (num % 1 !== 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a whole integer.</p>";
    return;
  }
  
  var classification = "";
  
  // If-else condition to check divisibility by 2
  if (num % 2 === 0) {
    classification = "Even";
  } else {
    classification = "Odd";
  }
  
  // Display dynamic result
  resultDiv.innerHTML = "<p>The number <strong>" + num + "</strong> is <strong>" + classification + "</strong>.</p>";
}
