document.addEventListener("DOMContentLoaded", function() {

    const recipesDiv = document.getElementById("latestRecipes");

    function displayRecipes(list) {
        recipesDiv.innerHTML = "";

        if (list.length === 0) {
            recipesDiv.innerHTML = `<p class="no-results">No recipes found.</p>`;
            return;
        }

        list.forEach(recipe => {
            const card = document.createElement("button");
            card.className = "latest-recipe-card";
            card.onclick = () => window.location.href = `/view_recipe/${recipe.id}`;

            card.innerHTML = `
                <img src="${recipe.image || 'https://placehold.co/300x200?text=No+Image'}" alt="${recipe.title}">
                <div class="card-info">
                    <h3>${recipe.title}</h3>
                    <p class="card-author">by ${recipe.author}</p>
                    <p class="card-tags">${recipe.tags?.join(", ") || ""}</p>
                </div>
            `;

            recipesDiv.appendChild(card);
        });
    }

    // Filter recipes as user types in search bar
   
    displayRecipes(latest_recipes);

});
