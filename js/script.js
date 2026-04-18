let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(name,price){

if(cart[name]){
cart[name].quantity++;
}else{
cart[name]={price:price,quantity:1};
}

saveCart();
alert("Plant added to cart");
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){

let count=0;

for(let item in cart){
count+=cart[item].quantity;
}

let element=document.getElementById("cart-count");

if(element){
element.innerText=count;
}
}

function loadCart(){

let container=document.getElementById("cart-items");
let total=0;

container.innerHTML="";

for(let item in cart){

let price=cart[item].price;
let qty=cart[item].quantity;
let itemTotal=price*qty;

total+=itemTotal;

let div=document.createElement("div");
div.className="cart-item";

div.innerHTML=`
<h3>${item}</h3>
<p>Price: ₹${price}</p>
<p>Quantity: ${qty}</p>
<p>Total: ₹${itemTotal}</p>

<button onclick="increase('${item}')">+</button>
<button onclick="decrease('${item}')">-</button>
<button onclick="removeItem('${item}')">Delete</button>
`;

container.appendChild(div);
}

document.getElementById("total").innerText="Total Cost: ₹"+total;

updateCartCount();
}

function increase(item){
cart[item].quantity++;
saveCart();
loadCart();
}

function decrease(item){
cart[item].quantity--;

if(cart[item].quantity<=0){
delete cart[item];
}

saveCart();
loadCart();
}

function removeItem(item){
delete cart[item];
saveCart();
loadCart();
}

function checkout(){
alert("Order placed successfully!");
localStorage.removeItem("cart");
location.reload();
}