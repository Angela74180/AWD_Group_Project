document.addEventListener("DOMContentLoaded", function () {
    populate();
});

function populate() {
    document.getElementById("recipes_for_shopping_list").innerText = "Recipes that you have selected to have a shopping list made from will appear here..."
    let recipes = Object.keys(shopping_list_dict);
    for (let recipe of recipes) {
        let recipeBanner = makeRecipeBanner(shopping_list_dict[recipe]);
        // recipeBanner.getElementsByTagName("i")[1].setAttribute("class", "bi bi-cart-fill");
        // recipeBanner.getElementsByTagName("i")[1].setAttribute("onclick", "removeFromCart(event)");
        
        // let bookmarked = Object.keys(bookmarked_dict);
        // console.log(bookmarked)
        // console.log(recipe)
        // if (recipe in Object.keys(bookmarked_dict)){
        //     recipeBanner.getElementsByTagName("i")[0].setAttribute("class", "bi bi-bookmark-fill");
        //     recipeBanner.getElementsByTagName("i")[0].setAttribute("onclick", "removeBookmark(event)");
        // }

        document.getElementById("recipes_for_shopping_list").appendChild(recipeBanner);
    }
}