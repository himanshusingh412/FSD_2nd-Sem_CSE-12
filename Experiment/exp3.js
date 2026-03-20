let newheading = document.getElementById("heading")
newheading.textContent = "DOM Manipulation in JavaScript";
newheading.style.color = "red";
newheading.style.fontSize = "30px";

let paragraphs = document.getElementsByClassName("paragraph")
paragraphs[0].innerHTML="<strong>This paragraph has been updated using JavaScript.</strong>"
paragraphs[0].style.color = "green";
paragraphs[0].style.fontSize = "20px";

let newDiv = document.createElement("div")
newDiv.textContent = "This is a new div element created using JavaScript.";
newDiv.style.color = "blue";
document.body.appendChild(newDiv)

function addList(list){
    let newList = document.createElement("li")
    

}
