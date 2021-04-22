class product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getPrice() {
        return this.price
    }
}

class item{
    constructor(product, quantity){
        this.product = product;
        this.quantity = quantity;
        this.sum = product.price * quantity;
    }

    getProduct() {
        return this.product
    }
    getProductName(){
        return this.product.getName()
    }
    getProductId() {
        return this.product.getId()
    }
    getProductPrice() {
        return this.product.getPrice()
    }
    getQuantity() {
        return this.quantity
    }
    getSum() {
        return this.sum;
    }
}

function pretty_price(price){
    //zaokr.
    //Math.round(perimeter*100)/100
}

function goUp(id){
    if(id > 0){
        let temp = items[id];
        items[id] = items[id - 1];  
        items[id - 1] = temp;

        refresh();
    }
}
function goDown(id){
    if(id < items.length - 1){
        let temp = items[parseInt(id) + 1];
        items[parseInt(id) + 1] = items[id];  
        items[id] = temp;

        refresh();
    }
}

function deleteFunc(id){
    items.splice(id,1);
    refresh();
}

function add(id, quantity){
    let table = document.getElementById("table");
    
    products.forEach(p=>{
        if(p.id == id) items.push(new item(p, quantity));
    })

    let i = items.length - 1;
    
    let sum = document.getElementById("sum");
    let sumFloat = parseFloat(sum.innerText);
    sumFloat += items[i].getSum();
    sum.innerHTML = sumFloat;

    let tr = "<tr>";
    tr += "<td><button id=\"" + i + "\" onclick=\"goUp(this.id)\">/\\</button><br>" +
              "<button id=\"" + i + "\" onclick=\"goDown(this.id)\">\\/</button></td>"
    tr += "<td>"+items[i].getProductId()+"</td>";
    tr += "<td>"+items[i].getProductName()+"</td>";
    tr += "<td>"+items[i].getQuantity()+"</td>";
    tr += "<td>"+items[i].getProductPrice()+"</td>";
    tr += "<td>"+items[i].getSum()+"</td>";
    tr += "<td><button>edit</button></td>"
    tr += "<td><button id=\"" + i + "\" onclick=\"deleteFunc(this.id)\">delete</button>"
    tr += "</tr>";  
    
    table.innerHTML += tr;
}

function refresh(){
    let select = document.getElementById("select");
    select.innerHTML = '';

    products.forEach(element => {
        let option = document.createElement("option");
        option.id = element.id;
        option.appendChild(document.createTextNode(element.name + " (" + element.price + "DOGE/kg)"));

        select.appendChild(option);
    });

    let table = document.getElementById("table");
    table.innerHTML = '';

    for(let i = 0; i < items.length; i++){
        let tr = "<tr>";
        tr += "<td><button id=\"" + i + "\" onclick=\"goUp(this.id)\">/\\</button><br>" +
                  "<button id=\"" + i + "\" onclick=\"goDown(this.id)\">\\/</button></td>"
        tr += "<td>"+items[i].getProductId()+"</td>";
        tr += "<td>"+items[i].getProductName()+"</td>";
        tr += "<td>"+items[i].getQuantity()+"</td>";
        tr += "<td>"+items[i].getProductPrice()+"</td>";
        tr += "<td>"+items[i].getSum()+"</td>";
        tr += "<td><button>edit</button></td>"
        tr += "<td><button id=\"" + i + "\" onclick=\"deleteFunc(this.id)\">delete</button>"
        tr += "</tr>";  
        
        table.innerHTML += tr;
    };
}

function add_click(){
    let options = document.getElementById("select").options;
    let id = options[options.selectedIndex].id;
    let quantity = document.getElementById("quantity");

    add(id, parseFloat(quantity.value));
}

function new_click(){
    let id = products[products.length - 1].id + 1;
    let name_input = document.getElementById("name");
    let price_input = document.getElementById("price");

    if(name_input.value != "New product" && parseFloat(price_input.value) != 0)
    {
        products.push(new product(id, name_input.value, price_input.value));
    }

    name_input.value = "New product";
    price_input.value = "0.00";

    refresh();
}

let products = [];
let items = [];

let id = 0;

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

refresh();

document.getElementById("select").selectedIndex = 0;
document.getElementById("quantity").defaultValue = "0.00";
document.getElementById("name").defaultValue = "New product";
document.getElementById("price").defaultValue = "0.00";