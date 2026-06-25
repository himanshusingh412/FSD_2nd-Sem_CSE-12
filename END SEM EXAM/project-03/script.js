// Sum of N Numbers - script.js

function calculateSum() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('limit').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid limit N.</p>";
    return;
  }
  
  var limit = parseFloat(rawValue);
  
  if (limit % 1 !== 0 || limit <= 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a positive whole integer.</p>";
    return;
  }
  
  var sum = 0;
  
  // Loop to calculate the sum from 1 to N
  for (var i = 1; i <= limit; i++) {
    sum = sum + i;
  }
  
  // Mathematical verification sum = N * (N + 1) / 2
  var formulaSum = (limit * (limit + 1)) / 2;
  
  resultDiv.innerHTML = 
    "<p><strong>Loop Sum (1 + 2 + ... + " + limit + "):</strong> " + sum + "</p>" +
    "<p><strong>Formula Sum:</strong> " + formulaSum + "</p>";
}
