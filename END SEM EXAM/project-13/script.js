// Student Result System - script.js

function calculateResult() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var sub1Val = document.getElementById('sub1').value;
  var sub2Val = document.getElementById('sub2').value;
  var sub3Val = document.getElementById('sub3').value;
  var sub4Val = document.getElementById('sub4').value;
  var sub5Val = document.getElementById('sub5').value;
  
  // Validation
  if (sub1Val === "" || sub2Val === "" || sub3Val === "" || sub4Val === "" || sub5Val === "" ||
      isNaN(sub1Val) || isNaN(sub2Val) || isNaN(sub3Val) || isNaN(sub4Val) || isNaN(sub5Val)) {
    resultDiv.innerHTML = "<p class='error'>Please enter valid marks for all 5 subjects.</p>";
    return;
  }
  
  var s1 = parseFloat(sub1Val);
  var s2 = parseFloat(sub2Val);
  var s3 = parseFloat(sub3Val);
  var s4 = parseFloat(sub4Val);
  var s5 = parseFloat(sub5Val);
  
  if (s1 < 0 || s1 > 100 || s2 < 0 || s2 > 100 || s3 < 0 || s3 > 100 || s4 < 0 || s4 > 100 || s5 < 0 || s5 > 100) {
    resultDiv.innerHTML = "<p class='error'>Marks must be between 0 and 100.</p>";
    return;
  }
  
  var total = s1 + s2 + s3 + s4 + s5;
  var percentage = (total / 500) * 100;
  var resultClass = "";
  
  // Academic Rule: Fail if marks in any subject is < 35
  if (s1 < 35 || s2 < 35 || s3 < 35 || s4 < 35 || s5 < 35) {
    resultClass = "Fail (Failed in one or more subjects)";
  } else {
    // If-else conditions for overall class classification
    if (percentage >= 75) {
      resultClass = "Distinction";
    } else if (percentage >= 60) {
      resultClass = "First Class";
    } else if (percentage >= 50) {
      resultClass = "Second Class";
    } else {
      resultClass = "Pass Class";
    }
  }
  
  resultDiv.innerHTML = 
    "<p><strong>Total Marks:</strong> " + total.toFixed(2) + " / 500</p>" +
    "<p><strong>Percentage:</strong> " + percentage.toFixed(2) + "%</p>" +
    "<p><strong>Result Class:</strong> " + resultClass + "</p>";
}
