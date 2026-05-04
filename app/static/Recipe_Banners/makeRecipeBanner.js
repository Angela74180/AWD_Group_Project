function addRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.innerHTML = `<button type="button" class="btn btn-remove" onclick="removeIngredient(event)">- Remove</button>`;
    document.getElementById("recipes_for_shopping_list").appendChild(newRecipeBanner);
}

function makeRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.setAttribute("class", "outerRecipeBanner");

    let div = document.createElement("div");
    let time = calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]);
    
    div.innerHTML = `
    <fieldset class="recipeBanner">
        <img src=${recipe_details_dict["recipeCoverImage"]} class = "recipeImage recipeBannerImage">
        <div class="recipeBannerText">
            <h3>${recipe_details_dict["recipeName"]}</h3>
            <p>- ${recipe_details_dict["author"]} • Takes <b>${time}</b>, Serves <b>${recipe_details_dict["serves"]}</b></p>
            <p>${recipe_details_dict["recipeDescription"]}</p>
        <div>
    </fieldset>
    `;

    let bookmark = document.createElement("i");
    if (Object.values(bookmarked_dict).includes(recipe_details_dict)){
        bookmark.setAttribute("class", "bi bi-bookmark-fill");
        bookmark.setAttribute("onclick", "removeBookmark(event)");
    }
    else{
        bookmark.setAttribute("class", "bi bi-bookmark");
        bookmark.setAttribute("onclick", "addBookmark(event)");
    }

    let cart = document.createElement("i");
    if (Object.values(shopping_list_dict).includes(recipe_details_dict)){
        cart.setAttribute("class", "bi bi-cart-fill");
        cart.setAttribute("onclick", "removeFromCart(event)");
    }
    else{
        cart.setAttribute("class", "bi bi-cart");
        cart.setAttribute("onclick", "addToCart(event)");
    }
    newRecipeBanner.appendChild(bookmark);
    newRecipeBanner.appendChild(cart);
    newRecipeBanner.appendChild(div);

    return newRecipeBanner;
}



function addToCart(cart) {
    cart.target.setAttribute("class", "bi bi-cart-fill");
    cart.target.setAttribute("onclick", "removeFromCart(event)");
}
function removeFromCart(cart) {
    cart.target.setAttribute("class", "bi bi-cart");
    cart.target.setAttribute("onclick", "addToCart(event)");
}

function addBookmark(bookmark) {
    bookmark.target.setAttribute("class", "bi bi-bookmark-fill");
    bookmark.target.setAttribute("onclick", "removeBookmark(event)");
}
function removeBookmark(bookmark) {
    bookmark.target.setAttribute("class", "bi bi-bookmark");
    bookmark.target.setAttribute("onclick", "addBookmark(event)");
}





