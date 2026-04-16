// Selecting elements from the HTML
let heading = document.getElementById("heading");
let input = document.getElementById("userText");
let para = document.getElementById("para");
let fontSize = 16;
let isvisible = true;


// Change heading text when button is clicked 
// onclick runs function when button is clicked
document.getElementById("changeTextBtn").onclick = function () {
    // innerText changes to text of heading
    heading.innerHTML = input.value;
};

// Input change Event
// onchange runs when user cghanges the input and clicks outside of it
input.onchange = function () {
    console.log("Input changed: ", input.value);
};


// Change background color
//addEventListener allows multiple events on same element
document.getElementById("bgColorBtn").addEventListener("click", function () {
    let randomBgColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomBgColor;
    document.body.style.fontFamily = "Arial, sans-serif";
});

// Increase font size of Headline
document.getElementById("fontSizeBtn").addEventListener("click", function () {
    if (fontSize < 80) {
        fontSize += 2;
    }
    heading.style.fontSize = fontSize + "px";
});

// Show/Hide para
document.getElementById("toggleBtn").addEventListener("click", function () {
    if (isvisible) {
        para.style.display = "none";
        isvisible = false;
    }
    else {
        para.style.display = "block";
        isvisible = true;
    }
});

// Reset page
document.getElementById("resetBtn").addEventListener("click", function () {
    location.reload(); //reload the pages
});
//MOuse over element (hover on heading)
heading.onmouseover = function () {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    heading.style.color = randomColor;
};