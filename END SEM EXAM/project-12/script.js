// Countdown Timer - script.js

var timerInterval = null;

function startCountdown() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }
  
  var rawValue = document.getElementById('seconds').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter starting seconds.</p>";
    return;
  }
  
  var seconds = parseFloat(rawValue);
  
  if (seconds % 1 !== 0 || seconds <= 0) {
    resultDiv.innerHTML = "<p class='error'>Please enter a positive whole integer.</p>";
    return;
  }
  
  // 1. Loop to build static countdown sequence string
  var sequenceText = "";
  for (var i = seconds; i >= 1; i--) {
    if (i === 1) {
      sequenceText = sequenceText + i + ".";
    } else {
      sequenceText = sequenceText + i + ", ";
    }
  }
  
  resultDiv.innerHTML = 
    "<div class='timer-display'><span id='seconds-left'>" + seconds + "</span>s</div>" +
    "<div class='sequence'><strong>Sequence:</strong> " + sequenceText + "</div>";
  
  var currentSeconds = seconds;
  var displaySpan = document.getElementById('seconds-left');
  
  // 2. Ticker dynamic countdown
  timerInterval = setInterval(function() {
    currentSeconds = currentSeconds - 1;
    displaySpan.innerText = currentSeconds;
    
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      displaySpan.innerText = "0";
      alert("Time's Up!");
    }
  }, 1000);
}
