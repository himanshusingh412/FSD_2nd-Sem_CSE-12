// Factorial Calculator - script.js

function calculateFactorial() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('number').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid number.</p>";
    return;
  }
  
  var num = parseFloat(rawValue);
  
  if (num % 1 !== 0 || num < 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a non-negative integer.</p>";
    return;
  }
  
  if (num > 170) {
    resultDiv.innerHTML = "<p class='error'>Number is too large (max 170 to avoid overflow).</p>";
    return;
  }
  
  var factorial = 1;
  
  // Loop to compute factorial (cumulative multiplication)
  for (var i = 1; i <= num; i++) {
    factorial = factorial * i;
  }
  
  resultDiv.innerHTML = "<p>The factorial of <strong>" + num + "!</strong> is: <br><strong style='font-size: 18px; color: #f43f5e;'>" + factorial + "</strong></p>";
}
