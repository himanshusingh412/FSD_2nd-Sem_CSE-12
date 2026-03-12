function calculateResult() {
    let n= document.getElementById("subjects").value;
    let totalMarks = 0;
    for (let i = 1; i <= n; i++) {
        let marks = parseFloat(prompt("Enter marks for subject " + i + ":"));
        totalMarks += marks;
    }
    let Average = totalMarks / n;
    let grade;
    let result;
    if (Average >= 90) {
        grade = 'A+';
    } else if (Average >= 80) {
        grade = 'A';
    } else if (Average >= 70) {
        grade = 'B';
    } else if (Average >= 60) {
        grade = 'C';
    } else if (Average >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }
    if (grade === 'F') {
        result = 'Fail';
    } else {
        result = 'Pass';
    }
    document.getElementById("result").innerHTML = `Total Marks: ${totalMarks}<br>Average: ${Average.toFixed(2)}<br>Grade: ${grade}<br>Result: ${result}`;
}