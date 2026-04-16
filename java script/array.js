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
let number = [1,2,3,4,5];
console.log(number[0]); // 1
console.log(number[1]); // 2
console.log(number[2]); // 3
console.log(number[3]); // 4

// array with multiple data types
let mixedArray = [1,"hello", true, {name: "Himanshu"}, [1,2,3]];
console.log(mixedArray[0]); // 1
console.log(mixedArray[1]); // "hello"
console.log(mixedArray[2]); // true
console.log(mixedArray[3]); // {name: "Himanshu"}
console.log(mixedArray[4]); // [1,2,3]

// map on array
let newarray = [1,2,3,4,5];
let squaredArray = newarray.map(num=>num*num);
console.log(squaredArray); // [1,4,9,16,25]

let nearray = [1,2,3,4,5];
let cubesArray = nearray.map(num=>num*num*num);
console.log(cubesArray); // [1,8,27,64,125]