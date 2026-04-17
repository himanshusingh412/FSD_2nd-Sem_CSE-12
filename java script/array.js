// object data type
let person = {
    name: "Himanshu",
    age: 20,
    city: "Prayagraj"
};
console.log(person.name); // Himanshu
console.log(person.age); // 20
console.log(person.city); // Prayagraj

// array data type
let number = [1, 2, 3, 4, 5];
console.log(number[0]); // 1
console.log(number[1]); // 2
console.log(number[2]); // 3
console.log(number[3]); // 4

// array with multiple data types
let mixedArray = [1, "hello", true, { name: "Himanshu" }, [1, 2, 3]];
console.log(mixedArray[0]); // 1
console.log(mixedArray[1]); // "hello"
console.log(mixedArray[2]); // true
console.log(mixedArray[3]); // {name: "Himanshu"}
console.log(mixedArray[4]); // [1,2,3]

// map on array
let newarray = [1, 2, 3, 4, 5];
let squareArray = newarray.map(num => num * num);
console.log(squareArray); // [1,4,9,16,25]

let nearray = [1, 2, 3, 4, 5];
let cubesArray = nearray.map(num => num * num * num);
console.log(cubesArray); // [1,8,27,64,125]

//normal function with no parameters
function greet() {
    console.log("Hello World");
}
greet();

//nrml function declaration 
function multiply(a, b) {
    return a * b;
}
console.log(multiply(2, 3)); // 6

//function expression
let multiply = function (a, b) {
    return a * b;
};
console.log(multiply(2, 4)); // 8

//arrow function.  ---- it create with the help of fun expresion ---- isme hmm varible store kr rhe h
let add = (a, b) => a + b;
console.log(add(2, 3)); // 5
let multiply = (a, b) => a * b;
console.log(multiply(2, 4)); // 8

//arrow function with single parameters.     --- jab single parameter ho to parenthesis nhi lagate
let square = x => x * x;
console.log(square(4)); // 16

//arrow function with no parameters.   --- jab no parameter ho to parenthesis lagate hai
const greetUser = (name) => {
    console.log(`Hello, ${name}!`);
};
greetUser("Himanshu"); // Hello, Himanshu!

//forEach on array
//forEach executes a provided function once for each array element
let numbers = [1, 2, 3, 4, 5];
numbers.forEach(function (num) {
    console.log(num);
});

//map on array
//map creates a new array populated with the results of calling a provided function on every element in the calling array
let nums = [1, 2, 3, 4, 5];
let squaredArray = newarray.map(num => num * num);
console.log(squaredArray); // [1,4,9,16,25]
let addedArray = nums.map(num => num + 5);
console.log(addedArray); // [6,7,8,9,10]

//filter on array
//filter creates a new array with all elements that pass the test implemented by the provided function
let numArray = [1, 2, 3, 4, 5];
let filterdEvenNumbers = evenNumbers.filter(num => num % 2 === 0);
console.log(filterdEvenNumbers); //[2,4]

//reduce can be used to reduce an array to a single value by applying a function to each element and accumulating the result
//accumulator is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied. currentValue is the current element being processed in the array.
let sum=[1,2,3,4,5];
let totalSum = sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(totalSum); // 15
let sums=[1,2,3,4,5];
let totalSums = sums.reduce((a, c) => a + c, 2);
console.log(totalSums); // 17
