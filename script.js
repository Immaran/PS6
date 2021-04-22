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
    setName(name) {
        this.name = name;
    }
    getPrice() {
        return this.price
    }
    setPrice(price){
        this.price = price;
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
    setProductName(name){
        this.product.setName(name);
    }
    getProductId(){
        return this.product.getId()
    }
    getProductPrice(){
        return this.product.getPrice()
    }
    setProductPrice(price){
        this.product.setPrice(price)
        this.sum = this.product.price * this.quantity;
    }
    getQuantity(){
        return this.quantity
    }
    setQuantity(quantity){
        this.quantity = quantity;
        this.sum = this.product.price * this.quantity;
    }
    getSum(){
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

function saveEditFunc(id){
    let name = document.getElementById("edited_name").value;
    let quantity = document.getElementById("edited_quantity").value
    let price = document.getElementById("edited_price").value

    if (name != "" && quantity > 0 && price > 0){    
        items[id].setProductName(name);
        items[id].setQuantity(quantity);
        items[id].setProductPrice(price);
        refresh();
    }
}

function editFunc(id){

    let table = document.getElementById("table");
    table.innerHTML = '';

    let tr = "<tr><th></th><th>Number</th><th style=\"width: 40%;\">Product</th><th>Quantity</th><th>Price</th><th>Sum</th><th class=\"ED\"></th><th class=\"ED\"></th></tr>"
    table.innerHTML += tr;

    for(let i = 0; i < items.length; i++){
        if(i == id){
            tr = "<tr>";
            tr += "<td><button id=\"" + i + "\" onclick=\"goUp(this.id)\">/\\</button><br><button id=\"" + i + "\" onclick=\"goDown(this.id)\">\\/</button></td>"
            tr += "<td>" + items[i].getProductId() + "</td>";
            tr += "<td><input type=\"text\" id=\"edited_name\" value=\"" + items[i].product.getName() + "\"></input></td>";
            tr += "<td><input type=\"number\" id=\"edited_quantity\" class=\"editedNumber\" value=\"" + items[i].getQuantity() + "\"></input></td>";
            tr += "<td><input type=\"number\" id=\"edited_price\" class=\"editedNumber\" value=\"" + items[i].product.getPrice() + "\"></input></td>";
            tr += "<td>" + items[i].getSum() + "</td>";
            tr += "<td><button id=\"" + i + "\" onclick=\"saveEditFunc(this.id)\">save</button>"
            tr += "<td><button id=\"" + i + "\" onclick=\"deleteFunc(this.id)\">delete</button>"
            tr += "</tr>"; 
        }
        else{
            tr = generateRow(i); 
        }
        
        table.innerHTML += tr;
    };
}

function add(id, quantity){
    let table = document.getElementById("table");
    
    let itemIndex = items.findIndex(x => x.getProductId() == id);

    if(itemIndex===-1){
        products.forEach(p=>{
            if(p.id == id) items.push(new item(p, quantity));
        })
    
        let i = items.length - 1;
        
        let sum = document.getElementById("sum");
        let sumFloat = parseFloat(sum.innerText);
        sumFloat += items[i].getSum();
        sum.innerHTML = sumFloat;
        
        table.innerHTML += generateRow(i);
    }
    else {
        items[itemIndex].setQuantity(parseInt(items[itemIndex].getQuantity())+quantity);
        let index = document.getElementById("select").selectedIndex;
        refresh();
        document.getElementById("select").selectedIndex = index;
    }

    toLocal();
}

function generateRow(i){
    tr = "<tr>";
    tr += "<td><button id=\"" + i + "\" onclick=\"goUp(this.id)\">/\\</button><br><button id=\"" + i + "\" onclick=\"goDown(this.id)\">\\/</button></td>"
    tr += "<td>"+items[i].getProductId()+"</td>";
    tr += "<td>"+items[i].getProductName()+"</td>";
    tr += "<td>"+items[i].getQuantity()+"</td>";
    tr += "<td>"+items[i].getProductPrice()+"</td>";
    tr += "<td>"+items[i].getSum()+"</td>";
    tr += "<td><button id=\"" + i + "\" onclick=\"editFunc(this.id)\">edit</button>"
    tr += "<td><button id=\"" + i + "\" onclick=\"deleteFunc(this.id)\">delete</button>"
    tr += "</tr>";
    return tr;
}

function toLocal(){
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("items", JSON.stringify(items));
}

function fromLocal(){
    let storedProducts = JSON.parse(localStorage.getItem("products"));
    let storedItems = JSON.parse(localStorage.getItem("items"));
    
    items = [];
    products = []

    if(storedProducts != null){
        for (let i = 0; i < storedProducts.length; i++){
            let newProduct = new product(storedProducts[i].id,storedProducts[i].name,storedProducts[i].price)
            products.push(newProduct);
        }
    }
    if(storedItems != null){
        for (let i = 0; i < storedItems.length; i++){
            let newProduct = new product(storedItems[i].product.id,storedItems[i].product.name,storedItems[i].product.price)
            let newItem = new item(newProduct, storedItems[i].quantity)
            items.push(newItem);
        }
    }
}

function refresh(){
    let select = document.getElementById("select");
    select.innerHTML = '';

    products.forEach(element => {
        let option = document.createElement("option");
        option.id = element.id;
        option.appendChild(document.createTextNode(element.name + " (" + element.price + " DOGE/kg)"));

        select.appendChild(option);
    });

    let table = document.getElementById("table");
    table.innerHTML = '';

    let tr = "<tr><th></th><th>Number</th><th style=\"width: 40%;\">Product</th><th>Quantity</th><th>Price</th><th>Sum</th><th class=\"ED\"></th><th class=\"ED\"></th></tr>"
    table.innerHTML += tr;

    let sum = document.getElementById("sum");
    let sumFloat = 0;

    for(let i = 0; i < items.length; i++){
        sumFloat += items[i].getSum();
        
        table.innerHTML += generateRow(i);
    };

    sum.innerHTML = sumFloat;
    
    toLocal();
}

function add_click(){
    let options = document.getElementById("select").options;
    let id = options[options.selectedIndex].id;
    let quantity = document.getElementById("quantity");

    if(quantity.value > 0){
        add(id, parseFloat(quantity.value));
    }
}

function new_click(){
    let id;
    if(products.length == 0){
        id = 0
    }
    else{
        let id = products[products.length - 1].id + 1;
    }

    let name_input = document.getElementById("name");
    let price_input = document.getElementById("price");

    if(name_input.value != "New product" && parseFloat(price_input.value) > 0)
    {
        products.push(new product(id, name_input.value, price_input.value));
    }

    name_input.value = "New product";
    price_input.value = "0.00";

    refresh();
}

let products = [];
let items = [];

fromLocal(); //odzysk listy na starcie programu

let id = products.length;

if(products.length == 0){
    // products.push(new product(id++, "Pomidor czerwony", 8));
    // products.push(new product(id++, "Pomidor pomarańczowy", 14));
    // products.push(new product(id++, "Pomidor zółty", 9));
    // products.push(new product(id++, "Pomidor zielony", 23));
    // products.push(new product(id++, "Pomidor czarny", 34));
    // products.push(new product(id++, "Pomidor malinowy", 18));
    // products.push(new product(id++, "Pomidor paprykowy", 21));
    // products.push(new product(id++, "Pomidor koktajlowy", 28));
    // products.push(new product(id++, "Pomidor polny", 5));
    // products.push(new product(id++, "Pomidor rzymski", 10));
    // products.push(new product(id++, "Pomidor bawole serce", 22));
    // products.push(new product(id++, "Pomidor gargamel", 17));
}

refresh();

document.getElementById("select").selectedIndex = 0;
document.getElementById("quantity").defaultValue = "0.00";
document.getElementById("name").defaultValue = "New product";
document.getElementById("price").defaultValue = "0.00";