function makeCart() {
    let cart = document.createElement("i");
    cart.setAttribute("class", "bi bi-cart");
    cart.setAttribute("onclick", "addToCart(event)");


    return cart;
}

function addToCart(cart) {
    cart.target.setAttribute("class", "bi bi-cart-fill");
    cart.target.setAttribute("onclick", "removeFromCart(event)");
}
function removeFromCart(cart) {
    cart.target.setAttribute("class", "bi bi-cart");
    cart.target.setAttribute("onclick", "addToCart(event)");
}