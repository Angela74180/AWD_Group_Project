document.addEventListener("DOMContentLoaded", function () {

    const recipeList = document.getElementById("recipeList");
    const searchBar = document.getElementById("searchBar");

    function displayRecipes(filteredRecipes) {
        recipeList.innerHTML = "";

        filteredRecipes.forEach(recipe => {
            const div = document.createElement("div");
            div.textContent = recipe.title;
            recipeList.appendChild(div);
        });
    }

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();

        if (searchTerm == ""){
            recipeList.innerHTML = "";
            return;
        }

        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().startsWith(searchTerm)
        );

        displayRecipes(filtered);
    });

});