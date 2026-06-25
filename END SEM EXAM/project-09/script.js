// Number Pattern Generator - script.js

function generatePattern() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('rows').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid number of rows.</p>";
    return;
  }
  
  var rows = parseFloat(rawValue);
  
  if (rows % 1 !== 0 || rows <= 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a positive whole integer.</p>";
    return;
  }
  
  if (rows > 15) {
    resultDiv.innerHTML = "<p class='error'>Maximum allowed rows is 15.</p>";
    return;
  }
  
  var patternText = "";
  
  // Nested Loops to generate the number pattern
  // Outer Loop: Controls rows
  for (var i = 1; i <= rows; i++) {
    
    // Inner Loop: Controls columns in each row
    for (var j = 1; j <= i; j++) {
      patternText = patternText + j;
    }
    
    // Add newline character at end of row
    patternText = patternText + "\n";
  }
  
  resultDiv.innerHTML = "<h3>Pattern:</h3><pre>" + patternText + "</pre>";
}
