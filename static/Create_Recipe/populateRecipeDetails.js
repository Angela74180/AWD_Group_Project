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



    for (let i = 0; i < recipe_details_dict["ingredients"].length; i++){
        addIngredient();
    }

    for (let i = 0; i < recipe_details_dict["appliances"].length; i++){
        addAppliance();
    }

    for (let i = 0; i < recipe_details_dict["steps"].length; i++){
        addStep();
    }
}