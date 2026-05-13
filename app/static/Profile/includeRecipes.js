document.addEventListener("DOMContentLoaded", function () {
    includeRecipes(my_recipes_list);
});

function includeRecipes(my_recipes_list){
    let container = document.getElementById("recipe_banner_div");
    
    container.innerHTML = `Looks like you don't have any recipes yet...`;
    

    if (my_recipes_list != ""){
        container.innerHTML = ``; 

        for (let recipe_dict of my_recipes_list){
            container.appendChild(makeRecipeBanner(recipe_dict, true));
        }
    }
}