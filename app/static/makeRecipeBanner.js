function addRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.innerHTML = `<button type="button" class="btn btn-remove" onclick="removeIngredient(event)">- Remove</button>`;
    document.getElementById("recipes_for_shopping_list").appendChild(newRecipeBanner);
}

function makeRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.setAttribute("class", "outerRecipeBanner");
    let time = calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]);
    newRecipeBanner.innerHTML = `
    <i class="bi bi-bookmark" onclick="addBookmark(event)"></i>&nbsp;&nbsp;&nbsp;<i class="bi bi-cart" onclick="addToCart(event)"></i>
    <fieldset class="recipeBanner">
        <img src=${recipe_details_dict["recipeCoverImage"]} class = "recipeImage recipeBannerImage">
        <div class="recipeBannerText">
            <h3>${recipe_details_dict["recipeName"]}</h3>
            <p>- ${recipe_details_dict["author"]} • Takes <b>${time}</b>, Serves <b>${recipe_details_dict["serves"]}</b></p>
            <p>${recipe_details_dict["recipeDescription"]}</p>
        <div>
    </fieldset>
    `;

    document.getElementById("recipes_for_shopping_list").appendChild(newRecipeBanner);
}




