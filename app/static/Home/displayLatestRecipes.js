document.addEventListener("DOMContentLoaded", function () {

    let recipesDiv = document.getElementById("latestRecipes");

    function displayLatestRecipes() {
        let selected = recipes;
        recipesDiv.innerHTML = "";

        selected.forEach(recipe => {
            let card = document.createElement("button");
            card.className = "latest-recipe-card";

            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            `;

            recipesDiv.appendChild(card);
        });
    }

    displayLatestRecipes(); 

});