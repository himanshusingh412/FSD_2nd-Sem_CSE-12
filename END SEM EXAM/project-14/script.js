// Sum of Even Numbers - script.js

function calculateEvenSum() {
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
  var evens = [];
  
  // Loop to sum all even numbers from 1 to N
  for (var i = 1; i <= limit; i++) {
    // Check if even
    if (i % 2 === 0) {
      sum = sum + i;
      evens.push(i);
    }
  }
  
  resultDiv.innerHTML = 
    "<p><strong>Even numbers found:</strong> " + (evens.length > 10 ? evens.slice(0, 10).join(', ') + ", ... (" + evens.length + " total)" : evens.join(', ')) + "</p>" +
    "<p><strong>Sum of Even Numbers:</strong> <strong style='font-size:18px; color:#3b82f6;'>" + sum + "</strong></p>";
}
