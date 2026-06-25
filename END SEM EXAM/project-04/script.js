// Multiplication Table Generator - script.js

function generateTable() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('number').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid number.</p>";
    return;
  }
  
  var num = parseFloat(rawValue);
  var outputHTML = "<h3>Table of " + num + ":</h3>";
  
  // Loop to generate multiplication table from 1 to 10
  for (var i = 1; i <= 10; i++) {
    var product = num * i;
    
    // Formatting float display cleanly
    var formattedProduct = product % 1 !== 0 ? product.toFixed(2) : product;
    var formattedNum = num % 1 !== 0 ? num.toFixed(2) : num;
    
    outputHTML = outputHTML + "<div class='table-row'>" + formattedNum + " &times; " + i + " = " + formattedProduct + "</div>";
  }
  
  resultDiv.innerHTML = outputHTML;
}
