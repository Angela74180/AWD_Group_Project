function handleRecipeForm() {
    let recipe_details_dict = getRecipeInfo()

    // Recipe Name
    if (recipe_details_dict["recipeName"] == "") {
        alert("Your recipe needs a name");
        return false;
    }

    // Time
    if (recipe_details_dict["timeList"]["totalTime"][0] == 0 && recipe_details_dict["timeList"]["totalTime"][1] == 0) {
        alert("Please Indicate how long your recipe will take to complete");
        return false;
    }


    // DO COVER PHOTO

    // // Ingredients
    // // Format = [ingredientName, ingredientQuantity, ingredientUnits, ingredientDescription]
    // let ingredientList = [];
    // for (ingredient of document.getElementById("Ingredients").childNodes){
    //     let ingredientDetails = [];

    //     if (ingredient.childNodes[3].value == "") {
    //         alert("Your ingredient needs name");
    //         return false;
    //     }
    //     if (ingredient.childNodes[5].value == "" && ingredient.childNodes[7].value != '"To Taste"') {
    //         alert("Your ingredient needs a quantity");
    //         return false;
    //     }
    //     if (ingredient.childNodes[7].value != "") {
    //         alert("Your ingredient needs units");
    //         return false;
    //     }

    //     ingredientDetails.push(ingredient.childNodes[3].value);
    //     ingredientDetails.push(ingredient.childNodes[5].value);
    //     ingredientDetails.push(ingredient.childNodes[7].value);
    //     ingredientDetails.push(ingredient.childNodes[13].value);

    //     ingredientList.push(ingredientDetails);

    //     alert(ingredient.childNodes[7]);

    // }


    // if (ingredientList.length == 0) {
    //     alert("Your recipe must have at least 1 ingredient");
    //     return false;
    // }



    // console.log(tagList);

    // console.log(ingredientList);

    if (recipeValid){
        alert("Recipe has successfully been published");
    }

    return true;
}
