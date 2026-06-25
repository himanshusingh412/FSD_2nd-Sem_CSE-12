// Temperature Converter - script.js

function convertToFahrenheit() {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  var rawValue = document.getElementById('celsius').value;
  
  // Validation
  if (rawValue === "" || isNaN(rawValue)) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid temperature value.</p>";
    return;
  }
  
  var celsius = parseFloat(rawValue);
  
  // F = (C * 9/5) + 32
  var fahrenheit = (celsius * 9 / 5) + 32;
  
  resultDiv.innerHTML = 
    "<p><strong>Celsius:</strong> " + celsius.toFixed(2) + " °C</p>" +
    "<p><strong>Fahrenheit:</strong> <strong style='font-size:18px; color:#f97316;'>" + fahrenheit.toFixed(2) + " °F</strong></p>" +
    "<p style='font-size:12px; color:#666; font-style:italic;'>Formula: (Celsius * 9/5) + 32</p>";
}
