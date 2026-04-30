function getRandomRecipes(arr, count) {
    return arr
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
}
