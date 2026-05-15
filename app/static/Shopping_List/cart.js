// This function Creates an element that acts as a cart symbol, based on what is stored in the database
function makeCart(cart_on) {
    let cart = document.createElement("i");

    if (cart_on){
        cart.setAttribute("class", "bi bi-cart-fill");
        cart.setAttribute("onclick", "removeFromCart(event)");
    }
    else{
        cart.setAttribute("class", "bi bi-cart");
        cart.setAttribute("onclick", "addToCart(event)");
    }

    return cart;
}

// This function is triggered when someone adds an item to the cart. It changes the element presented and updates the database
function addToCart(cart) {
    let recipe_id = cart.target.parentElement.getAttribute("recipe_id");

    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/updateShoppingList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ recipe_id: recipe_id, cart_status: "on"})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cart.target.setAttribute("class", "bi bi-cart-fill");
            cart.target.setAttribute("onclick", "removeFromCart(event)");
        }
        else{
            alert("Addition to Cart Failed")
        }
    })
    .catch(error => {
        alert("Addition to Cart Failed");
    });
}

// This function is triggered when someone removes an item from cart. It changes the element presented and updates the database
function removeFromCart(cart) {
    let recipe_id = cart.target.parentElement.getAttribute("recipe_id");

    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/updateShoppingList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ recipe_id: recipe_id, cart_status: "off"})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cart.target.setAttribute("class", "bi bi-cart");
            cart.target.setAttribute("onclick", "addToCart(event)");
        }
        else{
            alert("Removal from Cart Failed")
        }
    })
    .catch(error => {
        alert("Removal from Cart Failed");
    });
}