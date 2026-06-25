// Vowel or Consonant Checker - script.js

function checkCharacter() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var value = document.getElementById('character').value.trim();
  
  // Validation
  if (value === "") {
    resultDiv.innerHTML = "<p class='error'>Please enter a character.</p>";
    return;
  }
  
  if (value.length !== 1) {
    resultDiv.innerHTML = "<p class='error'>Please enter exactly one character.</p>";
    return;
  }
  
  var ch = value.toLowerCase();
  
  // Validation: Check range A-Z
  if (ch < 'a' || ch > 'z') {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid alphabet letter (A-Z).</p>";
    return;
  }
  
  var type = "";
  
  // If-else condition to check if letter is a vowel
  if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
    type = "Vowel";
  } else {
    type = "Consonant";
  }
  
  resultDiv.innerHTML = "<p>The character <strong>" + value.toUpperCase() + "</strong> is a <strong>" + type + "</strong>.</p>";
}
