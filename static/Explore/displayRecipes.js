document.addEventListener("DOMContentLoaded", function () {

    let selectedFilters = {
    cuisine: "All",
    difficulty: "All",
    time: "All",
    diet: "All"
    };

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

    function filterRecipes() {
        const searchTerm = searchBar.value.toLowerCase();

        const filtered = recipes.filter(recipe => {

            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm);

            const matchesCuisine =
                selectedFilters.cuisine === "All" ||
                recipe.cuisine === selectedFilters.cuisine;

            const matchesDifficulty =
                selectedFilters.difficulty === "All" ||
                recipe.difficulty === selectedFilters.difficulty;

            const matchesTime =
                selectedFilters.time === "All" ||
                recipe.time === selectedFilters.time;

            const matchesDiet =
                selectedFilters.diet === "All" ||
                recipe.diet === selectedFilters.diet;

            return matchesSearch &&
                matchesCuisine &&
                matchesDifficulty &&
                matchesTime &&
                matchesDiet;
        });

        displayRecipes(filtered);
    }

    searchBar.addEventListener("input", filterRecipes);

    document.querySelectorAll(".filter-bar button").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.filter;
            const value = button.dataset.value;

            selectedFilters[type] = value;

            filterRecipes();
        });
    });

    filterRecipes();

});