// Displays recipe banners on the Explore page and shows a message if no recipes match

document.addEventListener("DOMContentLoaded", function () {
    populate(recipes_list);
});


function populate(recipes_list) {

    let container = document.getElementById("recipe_banner_div");
    container.innerHTML = `No Recipes Meet Your Requirements...`;
    container.innerHTML += `<br><br>Make sure you don't have any unused filters open...`;
    if (recipes_list != ""){
        container.innerHTML = ``;
        for (let recipe_dict of recipes_list){
            container.appendChild(makeRecipeBanner(recipe_dict, false));
        }
    }
}