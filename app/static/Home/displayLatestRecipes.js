document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("recipe_banner_div");
    container.innerHTML = ``;
    if (chosen_recipes != ""){
        container.innerHTML = ``;
        for (let recipe_dict of chosen_recipes){
            container.appendChild(makeRecipeBanner(recipe_dict, false));
        }
    }
});
