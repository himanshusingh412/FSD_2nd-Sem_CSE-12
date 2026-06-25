// Simple Interest Calculator - script.js

function calculateInterest() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawP = document.getElementById('principal').value;
  var rawR = document.getElementById('rate').value;
  var rawT = document.getElementById('time').value;
  
  // Validation
  if (rawP === "" || rawR === "" || rawT === "" || isNaN(rawP) || isNaN(rawR) || isNaN(rawT)) {
    resultDiv.innerHTML = "<p class='error'>Please enter valid numbers in all fields.</p>";
    return;
  }
  
  var p = parseFloat(rawP);
  var r = parseFloat(rawR);
  var t = parseFloat(rawT);
  
  if (p <= 0 || r <= 0 || t <= 0) {
    resultDiv.innerHTML = "<p class='error'>All fields must be greater than zero.</p>";
    return;
  }
  
  // SI = (P * R * T) / 100
  var interest = (p * r * t) / 100;
  var totalAmount = p + interest;
  
  resultDiv.innerHTML = 
    "<p><strong>Simple Interest:</strong> ₹ " + interest.toFixed(2) + "</p>" +
    "<p><strong>Total Amount:</strong> ₹ " + totalAmount.toFixed(2) + "</p>";
}
