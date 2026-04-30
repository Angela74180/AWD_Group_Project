document.addEventListener("DOMContentLoaded", function () {

    const spotlightDiv = document.getElementById("spotlight");

    function displaySpotlight() {
        const selected = getRandomRecipes(recipes, 3);
        spotlightDiv.innerHTML = "";

        selected.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-card";

            card.innerHTML = `
                <h3>${recipe.title}</h3>
            `;

            spotlightDiv.appendChild(card);
        });
    }

    displaySpotlight(); 

});