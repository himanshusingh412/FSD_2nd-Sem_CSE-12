// Reverse a Number - script.js

function reverseNumber() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('number').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid integer.</p>";
    return;
  }
  
  var num = parseFloat(rawValue);
  
  if (num % 1 !== 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a whole integer.</p>";
    return;
  }
  
  var isNegative = num < 0;
  var temp = Math.abs(num);
  var reversed = 0;
  
  // Loop to reverse the number mathematically
  while (temp > 0) {
    var remainder = temp % 10;
    reversed = (reversed * 10) + remainder;
    temp = Math.floor(temp / 10);
  }
  
  if (isNegative) {
    reversed = reversed * -1;
  }
  
  resultDiv.innerHTML = 
    "<p>Original: " + num + "</p>" +
    "<p>Reversed: <strong style='font-size:18px; color:#ec4899;'>" + reversed + "</strong></p>";
}
