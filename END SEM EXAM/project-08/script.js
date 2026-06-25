// Prime Checker - script.js

function checkPrime() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('number').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid number.</p>";
    return;
  }
  
  var num = parseFloat(rawValue);
  
  if (num % 1 !== 0 || num <= 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a positive whole integer.</p>";
    return;
  }
  
  var isPrime = true;
  var factor = 0;
  
  if (num <= 1) {
    isPrime = false;
  } else {
    // Loop to search for divisibility factors up to num/2
    for (var i = 2; i <= num / 2; i++) {
      if (num % i === 0) {
        isPrime = false;
        factor = i;
        break;
      }
    }
  }
  
  if (isPrime) {
    resultDiv.innerHTML = "<p>The number <strong>" + num + "</strong> is a <strong style='color:#10b981;'>Prime Number</strong>.</p>";
  } else {
    if (num === 1) {
      resultDiv.innerHTML = "<p>The number <strong>1</strong> is neither prime nor composite.</p>";
    } else {
      resultDiv.innerHTML = "<p>The number <strong>" + num + "</strong> is a <strong style='color:#ef4444;'>Composite Number</strong> (divisible by " + factor + ").</p>";
    }
  }
}
