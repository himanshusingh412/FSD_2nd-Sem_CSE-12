let jsonString = '{"ProductName":"Laptop","price":1200,"instock": true}';
let product =JSON.parse(jsonString);
console.log(product.productName); 

// Convert JavaScript object to JSON string

let newProduct = { productName: "Mouse", price: 25, inStock: false };

let newJsonString = JSON.stringify(newProduct);

console.log(newJsonString); 

// Output:
// '{"productName":"Mouse","price":25,"inStock":false}'
let person = {
  name: "Charlie",
  age: 35,
  city: "New York"
};

let text = "";

for (let key in person) {
  text += key + ": " + person[key] + "\n";
}

console.log(text);