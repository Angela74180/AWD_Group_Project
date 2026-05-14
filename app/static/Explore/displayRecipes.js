document.addEventListener("DOMContentLoaded", function () {

    populate(recipes_list);

    document.getElementById("searchBar")
        .addEventListener("input", filterRecipes);

    document.querySelectorAll(".filter-bar select")
        .forEach(select => {
            select.addEventListener("change", filterRecipes);
        });
});

function filterRecipes() {

    const searchReqs = get_search_reqs();

    const filteredRecipes = recipes_list.filter(recipe => {

        const searchText =
            searchReqs.search_bar.toLowerCase();

        const matchesSearch =
            searchText === "" ||
            recipe.recipeName.toLowerCase().includes(searchText);

        const recipeMinutes =
            recipe.timeList.totalTime[0] * 60 +
            recipe.timeList.totalTime[1];

        const matchesTime =
            searchReqs.time === "All" ||

            (searchReqs.time === "Under 15 mins" &&
                recipeMinutes < 15) ||

            (searchReqs.time === "Under 30 mins" &&
                recipeMinutes <= 30) ||

            (searchReqs.time === "Under 1 hour" &&
                recipeMinutes <= 60) ||

            (searchReqs.time === "Over 1 hour" &&
                recipeMinutes > 60);

        const matchesDifficulty =
            searchReqs.difficulty === "All" ||
            recipe.recipeDifficulty === searchReqs.difficulty;

        const matchesType =
            searchReqs.type === "All" ||
            recipe.recipeType === searchReqs.type;

        const matchesTags =
            searchReqs.tags_list.length === 0 ||

            searchReqs.tags_list.every(tag =>
                recipe.tagList
                    .map(t => t.toLowerCase())
                    .includes(tag.toLowerCase())
            );

        const matchesIngredients =
            searchReqs.ingredients_list.length === 0 ||

            searchReqs.ingredients_list.every(ing =>
                (recipe.ingredients || [])
                    .map(i => i.toLowerCase())
                    .includes(ing.toLowerCase())
            );

        const matchesAppliances =
            searchReqs.exclude_appliance_list.length === 0 ||

            !searchReqs.exclude_appliance_list.some(app =>
                (recipe.appliances || [])
                    .map(a => a.toLowerCase())
                    .includes(app.toLowerCase())
            );

        return matchesSearch &&
            matchesTime &&
            matchesDifficulty &&
            matchesType &&
            matchesTags &&
            matchesIngredients &&
            matchesAppliances;
    });

    populate(filteredRecipes);
}