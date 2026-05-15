// Collects the current Explore page filter selections and returns them as an object

function get_search_reqs(){
    let tags = []
    let tags_div = document.getElementById("filter_tags").getElementsByTagName("input")
    for (let tag of tags_div){
        tags.push(tag.value);
    }

    let ingredients = []
    let ingredients_div = document.getElementById("filter_ingredients").getElementsByTagName("input")
    for (let ingredient of ingredients_div){
        ingredients.push(ingredient.value);
    }

    let appliances = []
    let appliances_div = document.getElementById("filter_appliances").getElementsByTagName("input")
    for (let appliance of appliances_div){
        appliances.push(appliance.value);
    }

    let search_reqs = {
        "search_bar": document.getElementById("searchBar").value,
        "time": document.getElementById("time").value,
        "difficulty": document.getElementById("difficulty").value,
        "type": document.getElementById("type").value,
        "tags_list": tags,
        "ingredients_list": ingredients,
        "exclude_appliance_list": appliances
    };
    

    console.log(search_reqs)
    return search_reqs
}