pancake_dict = {
    "author": "Angela74180",
    "recipeName": "My Pancake Recipe",
    "recipeType": "Dessert",
    "recipeDifficulty": "Simple",
    "tagList": [
        "Vegetarian"
    ],
    "timeSplit": false,
    "timeList": {
        "totalTime": [
            1,
            0
        ],
        "prepTime": [
            0,
            0
        ],
        "cookingTime": [
            0,
            0
        ]
    },
    "recipeDescription": "This is a recipe that create approximately 12 crepe like pancakes. They are great to have with your favourite toppings. I would recommend topping them with a sprinkle of sugar and a drizzle of lemon if you aren't sure what to add.",
    "recipeCoverImage": "",
    "visibility": "Friends_Only",
    "allowRatings": false,
    "allowReviews": false,
    "serves": 4,
    "status": "Draft",
    "ingredients": [
        {
            "name": "Plain Flour",
            "quantity": "115",
            "units": "g",
            "desc": ""
        },
        {
            "name": "Eggs",
            "quantity": "1",
            "units": "\"Whole\"",
            "desc": ""
        },
        {
            "name": "Milk",
            "quantity": "250",
            "units": "mL",
            "desc": ""
        },
        {
            "name": "Salt",
            "quantity": "1",
            "units": "\"Pinch\"",
            "desc": ""
        },
        {
            "name": "Butter",
            "quantity": "20",
            "units": "g",
            "desc": ""
        },
        {
            "name": "Castor Sugar",
            "quantity": "0.25",
            "units": "Cup",
            "desc": ""
        },
        {
            "name": "Lemon",
            "quantity": "1",
            "units": "\"Whole\"",
            "desc": "This is optional and is only required if you want to use it as a topping."
        }
    ],
    "appliances": [
        {
            "name": "Stove",
            "extraData": "",
            "desc": ""
        }
    ],
    "steps": [
        {
            "name": "Preparing The Batter",
            "desc": "Sift flour and salt into a bowl. Create a well in the centre and drop in the egg."
        },
        {
            "name": "Preparing The Batter",
            "desc": "Add half the liquids (includes butter) in small increments at a time and mix until smooth."
        },
        {
            "name": "Preparing The Batter",
            "desc": "Beat in the remaining liquid and stir until it has the consistency of thin cream."
        },
        {
            "name": "Cooking",
            "desc": "Pour a small amount (only enough to coat the bottom of the pan) into a frypan over medium heat."
        },
        {
            "name": "Cooking",
            "desc": "Flip the pancake over once the underside is mostly cooked."
        },
        {
            "name": "Cooking",
            "desc": "Once the pancake is cooked, serve it with your choice of toppings."
        }
    ]
}




function addRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.innerHTML = `<button type="button" class="btn btn-remove" onclick="removeIngredient(event)">- Remove</button>`;
    document.getElementById("recipes_for_shopping_list").appendChild(newRecipeBanner);
}

function makeRecipeBanner(recipe_details_dict){
    let newRecipeBanner = document.createElement("fieldset");
    newRecipeBanner.setAttribute("class", "recipeBanner");
    let time = calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]);
    newRecipeBanner.innerHTML = `
    <h3>${recipe_details_dict["recipeName"]}</h3>
    <p>- ${recipe_details_dict["author"]} • Takes <b>${time}</b>, Serves <b>${recipe_details_dict["serves"]}</b></p>
    <p>${recipe_details_dict["recipeDescription"]}</p>
    `;

    document.getElementById("recipes_for_shopping_list").appendChild(newRecipeBanner);
}




