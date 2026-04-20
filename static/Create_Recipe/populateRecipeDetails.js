function populate(recipe_details_dict) {
    console.log(recipe_details_dict)

    for (let i = 0; i < recipe_details_dict["tagList"].length; i++){
        addTag();
    }

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