let students = [];

// Add student
function addStudent(){

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let math = Number(document.getElementById("math").value);
    let science = Number(document.getElementById("science").value);
    let english = Number(document.getElementById("english").value);

    let student = {
        name: name,
        roll: roll,
        math: math,
        science: science,
        english: english
    };

    students.push(student);

    alert("Student Added");
}

// Display all students
function displayStudents(){

    let output = document.getElementById("output");
    output.innerHTML = "";

    for(let s of students){

        output.innerHTML +=
        "Name: " + s.name +
        " | Roll: " + s.roll +
        " | Math: " + s.math +
        " | Science: " + s.science +
        " | English: " + s.english +
        "<br>";
    }
}

// Calculate average
function showAverage(){

    let output = document.getElementById("output");
    output.innerHTML = "";

    for(let s of students){

        let total = s.math + s.science + s.english;
        let avg = total / 3;

        output.innerHTML +=
        s.name + " Average: " + avg.toFixed(2) + "<br>";
    }
}

// Students above 80
function showTopStudents(){

    let output = document.getElementById("output");
    output.innerHTML = "";

    for(let s of students){

        let avg = (s.math + s.science + s.english) / 3;

        if(avg > 80){

            output.innerHTML +=
            s.name + " | Average: " + avg.toFixed(2) + "<br>";
        }
    }
}

// Failed students
function showFailed(){

    let output = document.getElementById("output");
    output.innerHTML = "";

    for(let s of students){

        let avg = (s.math + s.science + s.english) / 3;

        if(avg < 40){

            output.innerHTML +=
            s.name + " | Average: " + avg.toFixed(2) + "<br>";
        }
    }
}

// Count students
function countStudents(){

    let output = document.getElementById("output");

    output.innerHTML =
    "Total Students: " + students.length;
}