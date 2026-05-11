document.addEventListener("DOMContentLoaded", function () {
    includeRecipes(my_recipes_list);
});

function includeRecipes(my_recipes_list){
    let container = document.getElementById("my_recipes");
    container.innerHTML = ``;

    for (let recipe_dict of my_recipes_list){
        container.appendChild(makeRecipeBanner(recipe_dict));
    }
}