// This function creates and returns an element that acts as a recipe banner
function makeRecipeBanner(recipe_details_dict, editable){
    let recipe_id = recipe_details_dict["recipeId"];

    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.setAttribute("class", "outerRecipeBanner");
    newRecipeBanner.setAttribute("recipe_id", recipe_id);

    if (recipe_details_dict["signed_in"]){
        newRecipeBanner.appendChild(makeBookmark(recipe_details_dict["bookmark_on"]));
        newRecipeBanner.innerHTML += `&nbsp;&nbsp;`
        newRecipeBanner.appendChild(makeCart(recipe_details_dict["cart_on"]));

        if (editable){
            newRecipeBanner.innerHTML += `&nbsp;&nbsp;`
            let editButton = document.createElement("a");
            editButton.setAttribute("href", `/create_recipe/${recipe_details_dict["recipeId"]}`);
            editButton.innerHTML = `<button class = "btn btn-add" >Edit Recipe</button>`;
            newRecipeBanner.appendChild(editButton);
        }
    }

    let div = document.createElement("div");
    let time = calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]);

    let tags = `<p>`
    for (let tag of recipe_details_dict["tagList"]){
        tags += `<button type="button" class="btn btn-tag"># ${tag}</button>`
    }
    tags += `</p>`
    
    if (recipe_details_dict["recipeCoverImage"]){
        div.innerHTML = `
        <fieldset class="recipeBanner" onclick = "location.href='/view_recipe/${recipe_details_dict["recipeId"]}'">
            <img src=${recipe_details_dict["recipeCoverImage"]} class = "recipeImage recipeBannerImage">
            <div class="recipeBannerText">
                <h3>${recipe_details_dict["recipeName"]}</h3>
                <p>- <a href="/outer_profile/${recipe_details_dict["authorId"]}">${recipe_details_dict["author"]}<a> • Takes <b>${time}</b>, Serves <b>${recipe_details_dict["serves"]}</b></p>
                ${tags}
                <p>${recipe_details_dict["recipeDescription"]}</p>
            <div>
        </fieldset>
        `;
    }
    else{
        div.innerHTML = `
        <fieldset class="recipeBanner" onclick = "location.href='/view_recipe/${recipe_details_dict["recipeId"]}'">
            <div class="recipeBannerText">
                <h3>${recipe_details_dict["recipeName"]}</h3>
                <p>- <a href="/outer_profile/${recipe_details_dict["authorId"]}">${recipe_details_dict["author"]}<a> • Takes <b>${time}</b>, Serves <b>${recipe_details_dict["serves"]}</b></p>
                ${tags}
                <p>${recipe_details_dict["recipeDescription"]}</p>
            <div>
        </fieldset>
        `;
    }

    newRecipeBanner.appendChild(div);

    return newRecipeBanner;
}





