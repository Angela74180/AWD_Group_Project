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

function addToCart(cart) {
    let recipe_id = cart.target.parentElement.getAttribute("recipe_id");
    let user_id = document.getElementById("recipe_banner_div").getAttribute("user_id");

    fetch("/updateShoppingList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipe_id: recipe_id, user_id: user_id, cart_status: "on"})
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

function removeFromCart(cart) {
    let recipe_id = cart.target.parentElement.getAttribute("recipe_id");
    let user_id = document.getElementById("recipe_banner_div").getAttribute("user_id");

    fetch("/updateShoppingList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipe_id: recipe_id, user_id: user_id, cart_status: "off"})
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