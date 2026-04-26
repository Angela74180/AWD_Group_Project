function getRecipeInfo(){
    let recipe_details_dict = {}

    alert("Author is currently hardcoded");
    // NEED TO MAKE THE AUTHOR CHANGE DYNAMICALLY
    recipe_details_dict["author"] = "Angela";
    recipe_details_dict["recipeName"] = document.getElementById("recipeName").value;
    recipe_details_dict["recipeType"] =  document.getElementById("recipeType").value;
    recipe_details_dict["recipeDifficulty"] = document.getElementById("recipeDifficulty").value;

    recipe_details_dict["tagList"] = []
    if (document.getElementById("Tags").childNodes.length > 0) {
        for (tag of document.getElementById("Tags").childNodes){
            if (tag.getElementsByTagName("input")[0].value != ""){
                recipe_details_dict["tagList"].push(tag.getElementsByTagName("input")[0].value);
            }
        }
    }

    recipe_details_dict["timeSplit"] = document.getElementById("timeCheckbox").checked;

    // FIX THIS PLEASE ANG????????????????? SOMETIMES REDUCES NUMBER FOR NO REASON
    recipe_details_dict["timeList"] = {
        "totalTime": [0, 0],
        "prepTime": [0, 0],
        "cookingTime": [0, 0]
    }

    let times = document.getElementById("Time").getElementsByTagName("input");
    // If there is no value in a input it sets the time there to 0
    for (let i = 0; i < times.length; i++){
        if (times[i].value == ""){
            times[i].value = "0";
        }
    }
    if (recipe_details_dict["timeSplit"]){
        let prephours = parseInt(times[0].value);
        let prepmins = parseInt(times[1].value);
        let cookhours = parseInt(times[2].value);
        let cookmins = parseInt(times[3].value);

        console.log(prephours)
        console.log(prepmins)
        console.log(cookhours)
        console.log(cookmins)

        // Integer division possible alternative in each of the following but hasn't been used
        while (prepmins >= 60) {
            prephours += 1;
            prepmins -= 60;
        }
        recipe_details_dict["timeList"]["prepTime"][0] = prephours;
        recipe_details_dict["timeList"]["prepTime"][1] = prepmins;

        while (cookmins >= 60) {
            cookhours += 1;
            cookmins -= 60;
        }
        recipe_details_dict["timeList"]["cookingTime"][0] = cookhours;
        recipe_details_dict["timeList"]["cookingTime"][1] = cookmins;

        let totalhours = prephours + cookhours;
        let totalmins = prepmins + cookmins;
        while (totalmins >= 60) {
            totalhours += 1;
            totalmins -= 60;
        }
        recipe_details_dict["timeList"]["totalTime"][0] = totalhours;
        recipe_details_dict["timeList"]["totalTime"][1] = totalmins;
    }
    else{
        let hours = parseInt(times[0].value);
        let mins = parseInt(times[1].value);

        console.log(hours)
        console.log(mins)

        // Integer division possible alternative here but more complex than it needs to be so I haven't used it
        while (mins >= 60) {
            hours += 1;
            mins -= 60;
        }
        recipe_details_dict["timeList"]["totalTime"][0] = hours;
        recipe_details_dict["timeList"]["totalTime"][1] = mins;
    }

    recipe_details_dict["recipeDescription"] = document.getElementById("Description").value;

    // FIX THIS PLEASE ANG?????????????????
    recipe_details_dict["recipeCoverImage"] = "";

    recipe_details_dict["visibility"] = document.getElementById("visibility").value;

    recipe_details_dict["allowRatings"] = document.getElementById("allowRatings").checked;
    recipe_details_dict["allowReviews"] = document.getElementById("allowReviews").checked;

    // FIX THIS PLEASE ANG?????????????????
    recipe_details_dict["status"] = "Draft";

    let ingredients = [];
    for (ingredient of document.getElementById("Ingredients").childNodes){
        ingredients.push({"name": ingredient.getElementsByTagName("input")[0].value, "quantity": ingredient.getElementsByTagName("input")[1].value, "units": ingredient.getElementsByTagName("input")[2].value, "desc": ingredient.getElementsByTagName("textarea")[0].value});
    }
    recipe_details_dict["ingredients"] = ingredients;

    let appliances = [];
    for (appliance of document.getElementById("Appliances").childNodes){
        let name = appliance.getElementsByTagName("input")[0].value;
        let desc = appliance.getElementsByTagName("textarea")[0].value;
        let extraData = ""
        if (name == "Microwave" || name == "Other"){
            extraData = appliance.getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
        }
        appliances.push({"name": name, "extraData": extraData, "desc": desc})
    }
    recipe_details_dict["appliances"] = appliances;

    let steps = [];
    for (step of document.getElementById("Steps").childNodes){
        steps.push({"name": step.getElementsByTagName("input")[0].value, "desc": step.getElementsByTagName("textarea")[0].value})
    }
    recipe_details_dict["steps"] = steps;

    console.log(recipe_details_dict);
    return recipe_details_dict;
}