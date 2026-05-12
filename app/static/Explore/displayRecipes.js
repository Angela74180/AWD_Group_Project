document.addEventListener("DOMContentLoaded", async function () {

    let selectedFilters = {
        cuisine: "All",
        difficulty: "All",
        time: "All",
        diet: "All"
    };

    const recipeList = document.getElementById("recipeList");
    const searchBar = document.getElementById("searchBar");

    let recipes = [];
    let filters = {};

    const [recipesRes, filtersRes] = await Promise.all([
        fetch("/api/recipes"),
        fetch("/api/filters")
    ]);

    recipes = await recipesRes.json();
    filters = await filtersRes.json();

    const cuisineSelect = document.querySelector('[data-filter="cuisine"]');
    const difficultySelect = document.querySelector('[data-filter="difficulty"]');
    const dietSelect = document.querySelector('[data-filter="diet"]');

    filters.cuisines.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        cuisineSelect.appendChild(opt);
    });

    filters.difficulties.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        difficultySelect.appendChild(opt);
    });

    filters.tags.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        dietSelect.appendChild(opt);
    });

    function displayRecipes(filteredRecipes) {

        recipeList.innerHTML = "";

        if (filteredRecipes.length === 0) {
            recipeList.textContent = "No recipes found.";
            return;
        }

        filteredRecipes.forEach(recipe => {
            const div = document.createElement("div");
            div.textContent = recipe.title;
            recipeList.appendChild(div);
        });
    }

    function filterRecipes() {

        const searchTerm = searchBar.value.toLowerCase();

        const filtered = recipes.filter(recipe => {

            const matchesSearch =
                searchTerm === "" ||
                recipe.title.toLowerCase().includes(searchTerm);

            const matchesCuisine =
                selectedFilters.cuisine === "All" ||
                recipe.cuisine === selectedFilters.cuisine;

            const matchesDifficulty =
                selectedFilters.difficulty === "All" ||
                recipe.difficulty === selectedFilters.difficulty;

            const matchesTime =
                selectedFilters.time === "All" ||
                (selectedFilters.time === "Under 15 min" && recipe.time < 15) ||
                (selectedFilters.time === "15-30 min" && recipe.time >= 15 && recipe.time <= 30) ||
                (selectedFilters.time === "30-60 min" && recipe.time > 30 && recipe.time <= 60) ||
                (selectedFilters.time === "60+" && recipe.time > 60);

            const matchesDiet =
                selectedFilters.diet === "All" ||
                recipe.tags.includes(selectedFilters.diet);

            return matchesSearch &&
                matchesCuisine &&
                matchesDifficulty &&
                matchesTime &&
                matchesDiet;
        });

        displayRecipes(filtered);
    }

    searchBar.addEventListener("input", filterRecipes);

    document.querySelectorAll(".filter-bar select").forEach(select => {
        select.addEventListener("change", () => {

            const type = select.dataset.filter;
            const value = select.value;

            selectedFilters[type] = value;

            filterRecipes();
        });
    });

    filterRecipes();
});