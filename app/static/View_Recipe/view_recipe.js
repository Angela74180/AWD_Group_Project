document.addEventListener("DOMContentLoaded", function () {
    view_recipe(recipe_details_dict);
});

function handleQuotes(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function view_recipe(recipe_details_dict) {
    let div_main = document.getElementsByClassName("div_main")[0]
    div_main.innerHTML += ``;
    
    div_main.innerHTML += `<img src=${recipe_details_dict["recipeCoverImage"]} class = "recipeImage recipeBannerImage">`;
    div_main.innerHTML += `<h1>~ ${recipe_details_dict["recipeName"]} ~</h1>`;


    // console.log(Object.values(bookmarked_dict));
    // console.log(recipe_details_dict);
    // console.log(Object.values(bookmarked_dict).includes(recipe_details_dict));

    // if (Object.values(bookmarked_dict).includes(recipe_details_dict)){
    //     div_main.innerHTML += `<i class="bi bi-bookmark-fill" onclick="removeBookmark(event)"></i>`;
    // }
    // else{
    //     div_main.innerHTML += `<i class="bi bi-bookmark" onclick="addBookmark(event)"></i>`;
    // }

    // if (Object.values(shopping_list_dict).includes(recipe_details_dict)){
    //     div_main.innerHTML += `<i class="bi bi-cart-fill" onclick="removeFromCart(event)"></i>`;
    // }
    // else{
    //     div_main.innerHTML += `<i class="bi bi-cart" onclick="addToCart(event)"></i>`;
    // }

    div_main.innerHTML += `<p>- ${recipe_details_dict["author"]}</p>`;

    //Tags
    if (recipe_details_dict["tagList"].length > 0) {
        for (tag of recipe_details_dict["tagList"]){
            div_main.innerHTML += `<button type="button" class="btn btn-tag"># ${tag}</button>`;
        }
    }
    div_main.innerHTML += `<br><br>`;

    // Brief Desc
    let timing = "<b> ";
    // If the time has been split into prep and cook time
    if (recipe_details_dict["timeSplit"]){
        timing += calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]) + "</b>, with an estimated " + calcTime(recipe_details_dict["timeList"]["prepTime"][0], recipe_details_dict["timeList"]["prepTime"][1]) + " of prep time and " + calcTime(recipe_details_dict["timeList"]["cookingTime"][0], recipe_details_dict["timeList"]["cookingTime"][1]) + " of cooking time";
        }
        else{
        timing += calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]) + "</b>";
        }
    timing += ".";
    div_main.innerHTML += `<p>A <b> ${recipe_details_dict["recipeDifficulty"]} ${recipe_details_dict["recipeType"]} </b> recipe that serves <b> ${recipe_details_dict["serves"]}</b>. It is estimated to take a total of ${timing}</p>`;
    
    // Desc
    div_main.innerHTML += `<p>${recipe_details_dict["recipeDescription"]}</p>`;
    div_main.innerHTML += `<br><br>`;


    // Ingredients
    div_main.innerHTML += `<h3>Ingredients:</h3>`;

    for (ingredient of recipe_details_dict["ingredients"]){
        let ingredientName = ingredient["name"];
        let ingredientQuantity = ingredient["quantity"];
        let ingredientUnits = ingredient["units"];
        let ingredientDescription = ingredient["desc"];

        let ingredientLine = "&nbsp;&nbsp;&nbsp;&nbsp;- ";

        // To Taste does not get a quantity
        if (ingredientUnits != '"To Taste"') {
            ingredientLine += ingredientQuantity;
        }

        // Units of measurement directly follow the quantity
        if (["mL", "L", "g", "kg", "fl oz", "oz", "lb"].includes(ingredientUnits)) {
            ingredientLine += ingredientUnits;
        }
        // If the unit is whole or to taste, we do not state this here
        else if (ingredientUnits != '"Whole"' && ingredientUnits != '"To Taste"') {
            ingredientLine += " " + ingredientUnits;
        }

        // State the Ingredient Name
        ingredientLine += " " + ingredientName;

        // To Taste is stated after the ingredient
        if (ingredientUnits == '"To Taste"') {
        ingredientLine +=" to taste";
        }

        if (ingredientDescription != "") {
        ingredientLine +="&nbsp;&nbsp;(" + ingredientDescription + ")";
        }

        ingredientLine +="<br>";

        div_main.innerHTML += `<p>${ingredientLine}</p>`;
    }


    // Appliances
    if (recipe_details_dict["appliances"].length > 0){
        div_main.innerHTML += `<br><br>`;
        div_main.innerHTML += `<h3>Appliances/Special Equipment:</h3>`;
    }
    for (appliance of recipe_details_dict["appliances"]){
        let applianceLine = "&nbsp;&nbsp;&nbsp;&nbsp;- ";

        if (appliance["name"] != "Other") {
        applianceLine += appliance["name"];
        }
        else {
        applianceLine += appliance["extraData"];
        }

        // If there is a microwave we need to include the wattage as well as any other notes
        if (appliance["name"] == "Microwave") {
        applianceLine += "&nbsp;&nbsp;(Recipe uses a " + appliance["extraData"] + " W microwave.";
        if (appliance["desc"] != "") {
            applianceLine += " " + appliance["desc"];
        }
        applianceLine += ")";
        }

        if (appliance["desc"] != "" && appliance["name"] != "Microwave") {
        applianceLine += "&nbsp;&nbsp;(";
        applianceLine += appliance["desc"] + ")";
        }

        applianceLine += "<br>";

        div_main.innerHTML += `<p>${applianceLine}</p>`;
    }

    // Method
    div_main.innerHTML += `<br><br>`;
    div_main.innerHTML += `<h3>Method</h3>`;
    let step_num = 1;

    for (step of recipe_details_dict["steps"]){
        div_main.innerHTML += `<br>`;

        let newStep = "<fieldset>";
        newStep += `<legend><h5>Step ` + step_num + `:`;

        //Add the step name if there is one
        if (step["name"] != "") {
            newStep += "&nbsp;&nbsp;(" + step["name"] + ")";
        }
        newStep += "</h5></legend>";

        if (step["photo"] !== ""){
            newStep += `<img src=${step["photo"]} class = "recipeImage recipeStepImage"></img>`;
        }

        newStep += "&nbsp;&nbsp;&nbsp;&nbsp;- " + step["desc"] + "</fieldset>";

        div_main.innerHTML += `${newStep}`;
        step_num++;
        
    }




    div_main.innerHTML += `<br><br>`;

    if (recipe_details_dict["allowRatings"] && !recipe_details_dict["allowReviews"]){
        div_main.innerHTML += `<button type="button" class="btn btn-add" onclick="rate(event)">Leave a Rating</button>`;
    }
    else if (!recipe_details_dict["allowRatings"] && recipe_details_dict["allowReviews"]){
        div_main.innerHTML += `<button type="button" class="btn btn-add" onclick="review(event)">Leave a Review</button>`;
    }
    else if (recipe_details_dict["allowRatings"] && recipe_details_dict["allowReviews"]){
        div_main.innerHTML += `<button type="button" class="btn btn-add" onclick="review_rate(event)">Leave a Review</button>`;
    }

    
}