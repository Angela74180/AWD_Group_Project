from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template("homePage.html")

@app.route("/explore")
def home():
    return render_template("explore.html")

@app.route("/shopping_list")
def shopping_list():
    return render_template("shopping_list.html")

@app.route('/create_recipe/<recipe_num>')
def create_recipe(recipe_num):

    empty_dict = {
        "allowRatings": True,
        "allowReviews": True,
        "appliances": [
            {
                "desc": "",
                "extraData": "",
                "name": ""
            }
        ],
        "author": "",
        "ingredients": [
            {
                "desc": "",
                "name": "",
                "quantity": "",
                "units": ""
            }
        ],
        "recipeCoverImage": "",
        "recipeDescription": "",
        "recipeDifficulty": "Simple",
        "recipeName": "",
        "recipeType": "Breakfast",
        "serves": "",
        "status": "Draft",
        "steps": [
            {
                "desc": "",
                "name": ""
            }
        ],
        "tagList": [
            ""
        ],
        "timeList": {
            "cookingTime": [
                "",
                ""
            ],
            "prepTime": [
                "",
                ""
            ],
            "totalTime": [
                "",
                ""
            ]
        },
        "timeSplit": False,
        "visibility": "Private"
    }



    pancake_dict = {
        "author": "Angela74180",
        "recipeName": "My Pancake Recipe",
        "recipeType": "Dessert",
        "recipeDifficulty": "Simple",
        "tagList": [
            "Vegetarian"
        ],
        "timeSplit": False,
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
        "allowRatings": False,
        "allowReviews": False,
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



    tuna_mornay_dict = {
        "author": "Angela74180",
        "recipeName": "Tuna Mornay",
        "recipeType": "Dinner",
        "recipeDifficulty": "Intermediate",
        "serves": 8,
        "tagList": [
            "Pescatarian"
        ],
        "timeSplit": False,
        "timeList": {
            "totalTime": [
                0,
                40
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
        "recipeDescription": "This is a recipe that serves approximately 8. It is great to have with a side of vegetables or is fine on its own.",
        "recipeCoverImage": "",
        "visibility": "Private",
        "allowRatings": True,
        "allowReviews": True,
        "status": "Draft",
        "ingredients": [
            {
                "name": "Tuna",
                "quantity": "1",
                "units": "\"Tin\"",
                "desc": "The tin is 200g."
            },
            {
                "name": "Lemon Juice",
                "quantity": "1",
                "units": "tbsp",
                "desc": ""
            },
            {
                "name": "Garlic Salt",
                "quantity": "0.5",
                "units": "tsp",
                "desc": ""
            },
            {
                "name": "Plain Flour",
                "quantity": "0.25",
                "units": "Cup",
                "desc": "AKA 2 tbsps."
            },
            {
                "name": "Milk",
                "quantity": "2",
                "units": "Cup",
                "desc": ""
            },
            {
                "name": "Crushed Potato Crisps",
                "quantity": "1",
                "units": "Cup",
                "desc": ""
            },
            {
                "name": "Onion Flakes",
                "quantity": "1",
                "units": "tsp",
                "desc": ""
            },
            {
                "name": "Chopped Parsley",
                "quantity": "2",
                "units": "tbsp",
                "desc": ""
            },
            {
                "name": "Margarine",
                "quantity": "0.25",
                "units": "Cup",
                "desc": ""
            },
            {
                "name": "Cayenne Pepper",
                "quantity": "1",
                "units": "\"Pinch\"",
                "desc": ""
            },
            {
                "name": "Crumbled Bread",
                "quantity": "2",
                "units": "\"Slices\"",
                "desc": ""
            }
        ],
        "appliances": [
            {
                "name": "Oven",
                "extraData": "",
                "desc": ""
            },
            {
                "name": "Stove",
                "extraData": "",
                "desc": ""
            }
        ],
        "steps": [
            {
                "name": "",
                "desc": "Combine Drained and flaked tuna, onion flakes, lemon juice, parsley and garlic salt. "
            },
            {
                "name": "White Sauce",
                "desc": "In a pot over the stove, melt the marg and blend in flour and seasonings. Add the milk very gradually and cook until it is thick and smooth, stirring constantly."
            },
            {
                "name": "",
                "desc": "Fold in the tuna mixture and breadcrumbs and place the mixture in a casserole dish."
            },
            {
                "name": "",
                "desc": "Cover with potato crisps."
            },
            {
                "name": "Cooking It",
                "desc": "Cook at 400 degrees F for 20 mins."
            }
        ]
    }

    recipes_dict = {}

    if recipe_num == "0":
        recipes_dict = empty_dict
    elif recipe_num == "1":
        recipes_dict = pancake_dict
    else:
        recipes_dict = tuna_mornay_dict

    return render_template('create_recipe.html', recipe_details_dict=recipes_dict) 

@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('loginPage.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return render_template('signupPage.html')