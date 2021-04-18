class product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class item{
    constructor(product, quantity){
        this.product = product;
        this.quantity = quantity;
        this.sum = product.price * quantity;
    }
}

function add(){
    let table = document.getElementById(table);
    let element = document.createElement("tr");
    


    // var tag = document.createElement("p");
    // var text = document.createTextNode("Tutorix is the best e-learning platform");
    // tag.appendChild(text);
    // var element = document.getElementById("new");
    // element.appendChild(tag);

    table.appendChild(element);
}

let products = [];
let items = [];

let id = 1;

products.push(new product(id++, "Pomidor czerwony", 8));
products.push(new product(id++, "Pomidor pomarańczowy", 14));
products.push(new product(id++, "Pomidor zółty", 9));
products.push(new product(id++, "Pomidor zielony", 23));
products.push(new product(id++, "Pomidor czarny", 34));
products.push(new product(id++, "Pomidor malinowy", 18));
products.push(new product(id++, "Pomidor paprykowy", 21));
products.push(new product(id++, "Pomidor koktajlowy", 28));
products.push(new product(id++, "Pomidor polny", 5));
products.push(new product(id++, "Pomidor rzymski", 10));
products.push(new product(id++, "Pomidor bawole serce", 22));
products.push(new product(id++, "Pomidor gargamel", 17));

items.push(new item(products[3], 2));

console.log(products);

console.log(items)

