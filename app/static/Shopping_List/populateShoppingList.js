document.addEventListener("DOMContentLoaded", function () {
    populate(recipes_list);
});

// This function includes recipe banners for all shopping list recipes in the shopping list page
function populate(recipes_list) {

    let container = document.getElementById("recipe_banner_div");
    container.innerHTML = `Looks like you don't have any recipes in your cart yet...`;
    if (recipes_list != ""){
        container.innerHTML = ``;
        for (let recipe_dict of recipes_list){
            container.appendChild(makeRecipeBanner(recipe_dict, false));
        }
    }
}