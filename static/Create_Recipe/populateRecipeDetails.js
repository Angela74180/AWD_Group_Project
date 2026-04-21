function handleQuotes(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function populate(recipe_details_dict) {
    console.log(recipe_details_dict)

    document.getElementById("recipeName").value = handleQuotes(recipe_details_dict["recipeName"]);
    document.getElementById("recipeType").value = handleQuotes(recipe_details_dict["recipeType"]);
    document.getElementById("recipeDifficulty").value = handleQuotes(recipe_details_dict["recipeDifficulty"]);

    for (tag of recipe_details_dict["tagList"]){
        addTag(tag);
    }

    document.getElementById("timeCheckbox").checked = recipe_details_dict["timeSplit"];
    splitTime(recipe_details_dict["timeList"]);

    // DO PHOTO!!

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
}