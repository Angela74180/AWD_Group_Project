document.addEventListener("DOMContentLoaded", function () {
    populate(recipes_list);
});

function populate(recipes_list) {
    let container = document.getElementById("recipe_banner_div");
    container.innerHTML = `Looks like you haven't saved any recipes yet...`;
    if (recipes_list != ""){
        container.innerHTML = ``;
        for (let recipe_dict of recipes_list){
            container.appendChild(makeRecipeBanner(recipe_dict, false));
        }
    }
}