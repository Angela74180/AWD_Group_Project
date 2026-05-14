document.addEventListener("DOMContentLoaded", function () {
    populate(recipe_details_dict);
});

function handleQuotes(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function populate(recipe_details_dict) {
    console.log(recipe_details_dict)

    document.getElementById("recipeName").value = handleQuotes(recipe_details_dict["recipeName"]);
    document.getElementById("recipeType").value = handleQuotes(recipe_details_dict["recipeType"]);
    document.getElementById("recipeDifficulty").value = handleQuotes(recipe_details_dict["recipeDifficulty"]);
    document.getElementById("serves").value = recipe_details_dict["serves"];

    for (tag of recipe_details_dict["tagList"]){
        addTag(tag);
    }

    document.getElementById("timeCheckbox").checked = recipe_details_dict["timeSplit"];
    splitTime(recipe_details_dict["timeList"]);
    
    let coverPhoto = document.getElementById("coverPhoto");
    let photo_div = coverPhoto.nextElementSibling;
    if (recipe_details_dict["recipeCoverImage"]){
        let image = document.createElement("img");
        image.setAttribute("src", recipe_details_dict["recipeCoverImage"]);
        image.setAttribute("class", "preview_image");
        photo_div.appendChild(image);
    }
    photo_div.nextElementSibling.value = recipe_details_dict["recipeCoverImage"];

    document.getElementById("Description").value = recipe_details_dict["recipeDescription"];

    for (ingredient of recipe_details_dict["ingredients"]){
        addIngredient(ingredient);
    }

    for (appliance of recipe_details_dict["appliances"]){
        addAppliance(appliance);
    }

    for (step of recipe_details_dict["steps"]){
        addStep(step);
    }

    document.getElementById("visibility").value = handleQuotes(recipe_details_dict["visibility"]);
    document.getElementById("allowRatings").checked = recipe_details_dict["allowRatings"];
    document.getElementById("allowReviews").checked = recipe_details_dict["allowReviews"];

}