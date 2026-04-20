from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return '<h1>THIS WILL BE A HOME PAGE</h1>'

@app.route('/create_recipe/<recipe_num>')
def create_recipe(recipe_num):

    recipe_details_dict = {
        "recipeName": "My Pancake Recipe",
        "recipeType": "Dessert",
        "recipeDifficulty": "Challenging",
        "tagList": ["Vegetarian", "YAY"],
        "timeSplit": False,
        "timeList": {"totalTime": [1, 20], "prepTime": [0, 30], "cookingTime": [0, 50]},
        "recipeDescription": "YOU WILL LOVE THIS. I SWEAR.",
        "recipeCoverImage": "",
        "visibility": "Friends_Only",
        "allowRatings": True,
        "allowReviews": True,
        "status": "Draft",

        "ingredients": [
            {"name": "Plain Flour", "quantity": 750, "units": "g", "desc": "NOT SELF RAISING OR IT WILL EXPLODE"},
            {"name": "Eggs", "quantity": 3, "units": '"Whole"', "desc": ""},
            {"name": "Milk", "quantity": 250, "units": "mL", "desc": ""},
            {"name": "Salt", "quantity": 1, "units": '"To Taste"' , "desc": "Please do not taste the batter before it is cooked"},
            {"name": "Butter", "quantity": 2, "units": "tbsp", "desc": ""}
        ],

        "appliances": [
            {"name": "Stove", "extraData": "", "desc": ""},
            {"name": "Microwave", "extraData": "850", "desc": "For warming butter"}
        ],

        "steps": [
            {"name": "Prepare The Batter", "desc": "COMBINE ALL INGREDIENTS"},
            {"name": "", "desc": "COOK it in a fryingpan"}
        ]
    }

    return render_template('create_recipe.html', recipe_details_dict=recipe_details_dict) 



