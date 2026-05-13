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

            (searchReqs.time === "Under 15 min" &&
                recipeMinutes < 15) ||

            (searchReqs.time === "15-30 min" &&
                recipeMinutes >= 15 &&
                recipeMinutes <= 30) ||

            (searchReqs.time === "30-60 min" &&
                recipeMinutes > 30 &&
                recipeMinutes <= 60) ||

            (searchReqs.time === "60+" &&
                recipeMinutes > 60);

        const matchesDifficulty =
            searchReqs.difficulty === "All" ||
            recipe.recipeDifficulty === searchReqs.difficulty;

        const matchesTags =
            searchReqs.tags_list.length === 0 ||

            searchReqs.tags_list.every(tag =>
                recipe.tagList
                    .map(t => t.toLowerCase())
                    .includes(tag.toLowerCase())
            );

        return matchesSearch &&
            matchesTime &&
            matchesDifficulty &&
            matchesTags;
    });

    populate(filteredRecipes);
}