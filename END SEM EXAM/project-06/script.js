// Largest Number Finder - script.js

function findLargest() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var val1 = document.getElementById('num1').value;
  var val2 = document.getElementById('num2').value;
  var val3 = document.getElementById('num3').value;
  var val4 = document.getElementById('num4').value;
  var val5 = document.getElementById('num5').value;
  
  // Validation
  if (val1 === "" || val2 === "" || val3 === "" || val4 === "" || val5 === "" ||
      isNaN(val1) || isNaN(val2) || isNaN(val3) || isNaN(val4) || isNaN(val5)) {
    resultDiv.innerHTML = "<p class='error'>Please enter valid numbers in all 5 fields.</p>";
    return;
  }
  
  var n1 = parseFloat(val1);
  var n2 = parseFloat(val2);
  var n3 = parseFloat(val3);
  var n4 = parseFloat(val4);
  var n5 = parseFloat(val5);
  
  // Find largest using if-else conditions
  var largest = n1;
  
  if (n2 > largest) {
    largest = n2;
  }
  if (n3 > largest) {
    largest = n3;
  }
  if (n4 > largest) {
    largest = n4;
  }
  if (n5 > largest) {
    largest = n5;
  }
  
  resultDiv.innerHTML = 
    "<p>Numbers entered: " + n1 + ", " + n2 + ", " + n3 + ", " + n4 + ", " + n5 + "</p>" +
    "<p>The largest number is: <strong style='color:#0d9488; font-size: 18px;'>" + largest + "</strong></p>";
}
