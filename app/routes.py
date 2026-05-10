from flask import render_template, request, redirect, url_for
from app import app
from flask_login import login_user, logout_user
from app.models import User
from app import db

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
                "name": "",
                "photo": ""
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
        "recipeCoverImage": "https://www.jocooks.com/wp-content/uploads/2018/12/crepes-1-8.jpg",
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
                "desc": "Sift flour and salt into a bowl. Create a well in the centre and drop in the egg.",
                "photo": ""
            },
            {
                "name": "Preparing The Batter",
                "desc": "Add half the liquids (includes butter) in small increments at a time and mix until smooth.",
                "photo": ""
            },
            {
                "name": "Preparing The Batter",
                "desc": "Beat in the remaining liquid and stir until it has the consistency of thin cream.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Pour a small amount (only enough to coat the bottom of the pan) into a frypan over medium heat.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Flip the pancake over once the underside is mostly cooked.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Once the pancake is cooked, serve it with your choice of toppings.",
                "photo": "https://www.jocooks.com/wp-content/uploads/2018/12/crepes-1-8.jpg"

            }
        ]
    }



    tuna_mornay_dict = {
        "allowRatings": True,
        "allowReviews": True,
        "appliances": [
            {
                "desc": "",
                "extraData": "",
                "name": "Oven"
            },
            {
                "desc": "",
                "extraData": "",
                "name": "Stove"
            }
        ],
        "author": "Angela74180",
        "ingredients": [
            {
                "desc": "The tin is 200g.",
                "name": "Tuna",
                "quantity": "1",
                "units": "\"Tin\""
            },
            {
                "desc": "",
                "name": "Lemon Juice",
                "quantity": "1",
                "units": "tbsp"
            },
            {
                "desc": "",
                "name": "Garlic Salt",
                "quantity": "0.5",
                "units": "tsp"
            },
            {
                "desc": "AKA 2 tbsps.",
                "name": "Plain Flour",
                "quantity": "0.25",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Milk",
                "quantity": "2",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Crushed Potato Crisps",
                "quantity": "1",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Onion Flakes",
                "quantity": "1",
                "units": "tsp"
            },
            {
                "desc": "",
                "name": "Chopped Parsley",
                "quantity": "2",
                "units": "tbsp"
            },
            {
                "desc": "",
                "name": "Margarine",
                "quantity": "0.25",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Cayenne Pepper",
                "quantity": "1",
                "units": "\"Pinch\""
            },
            {
                "desc": "",
                "name": "Crumbled Bread",
                "quantity": "2",
                "units": "\"Slices\""
            }
        ],
        "recipeCoverImage": "https://tse1.mm.bing.net/th/id/OIP.Z5_7sbpWkaWZJkN6qd17GgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        "recipeDescription": "This is a recipe that serves approximately 8. It is great to have with a side of vegetables or is fine on its own.",
        "recipeDifficulty": "Intermediate",
        "recipeName": "Tuna Mornay",
        "recipeType": "Dinner",
        "serves": 8,
        "status": "Draft",
        "steps": [
            {
                "desc": "Combine Drained and flaked tuna, onion flakes, lemon juice, parsley and garlic salt. ",
                "name": "",
                "photo": ""
            },
            {
                "desc": "In a pot over the stove, melt the marg and blend in flour and seasonings. Add the milk very gradually and cook until it is thick and smooth, stirring constantly.",
                "name": "White Sauce",
                "photo": ""
            },
            {
                "desc": "Fold in the tuna mixture and breadcrumbs and place the mixture in a casserole dish.",
                "name": "",
                "photo": ""
            },
            {
                "desc": "Cover with potato crisps.",
                "name": "",
                "photo": ""
            },
            {
                "desc": "Cook at 400 degrees F for 20 mins.",
                "name": "Cooking It",
                "photo": "https://tse1.mm.bing.net/th/id/OIP.Z5_7sbpWkaWZJkN6qd17GgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
            }
        ],
        "tagList": [
            "Pescatarian",
            "OTHER"
        ],
        "timeList": {
            "cookingTime": [
                0,
                0
            ],
            "prepTime": [
                0,
                0
            ],
            "totalTime": [
                0,
                40
            ]
        },
        "timeSplit": False,
        "visibility": "Private"
    }

    recipes_dict = {}

    if recipe_num == "0":
        recipes_dict = empty_dict
    elif recipe_num == "1":
        recipes_dict = pancake_dict
    elif recipe_num == "2":
        recipes_dict = tuna_mornay_dict
    else:
        return "Recipe not found", 404

    return render_template('create_recipe.html', recipe_details_dict=recipes_dict) 
    # return render_template('create_recipe.html', recipe_num=recipe_num) 



@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('index'))

        return render_template('loginPage.html', error="Invalid credentials")

    return render_template('loginPage.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':

        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        existing_user = User.query.filter_by(username=username).first()

        if existing_user:
            return render_template('signupPage.html', error="User already exists")

        user = User(
            username=username,
            email=email
        )

        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return redirect(url_for('login'))

    return render_template('signupPage.html')

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/profile")
def profile():
    return render_template("profilePage.html")



@app.route('/view_recipe/<recipe_num>')
def view_recipe(recipe_num):

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
                "name": "",
                "photo": ""
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
        "recipeCoverImage": "https://www.jocooks.com/wp-content/uploads/2018/12/crepes-1-8.jpg",
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
                "desc": "Sift flour and salt into a bowl. Create a well in the centre and drop in the egg.",
                "photo": ""
            },
            {
                "name": "Preparing The Batter",
                "desc": "Add half the liquids (includes butter) in small increments at a time and mix until smooth.",
                "photo": ""
            },
            {
                "name": "Preparing The Batter",
                "desc": "Beat in the remaining liquid and stir until it has the consistency of thin cream.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Pour a small amount (only enough to coat the bottom of the pan) into a frypan over medium heat.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Flip the pancake over once the underside is mostly cooked.",
                "photo": ""
            },
            {
                "name": "Cooking",
                "desc": "Once the pancake is cooked, serve it with your choice of toppings.",
                "photo": "https://www.jocooks.com/wp-content/uploads/2018/12/crepes-1-8.jpg"

            }
        ]
    }



    tuna_mornay_dict = {
        "allowRatings": True,
        "allowReviews": True,
        "appliances": [
            {
                "desc": "",
                "extraData": "",
                "name": "Oven"
            },
            {
                "desc": "",
                "extraData": "",
                "name": "Stove"
            }
        ],
        "author": "Angela74180",
        "ingredients": [
            {
                "desc": "The tin is 200g.",
                "name": "Tuna",
                "quantity": "1",
                "units": "\"Tin\""
            },
            {
                "desc": "",
                "name": "Lemon Juice",
                "quantity": "1",
                "units": "tbsp"
            },
            {
                "desc": "",
                "name": "Garlic Salt",
                "quantity": "0.5",
                "units": "tsp"
            },
            {
                "desc": "AKA 2 tbsps.",
                "name": "Plain Flour",
                "quantity": "0.25",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Milk",
                "quantity": "2",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Crushed Potato Crisps",
                "quantity": "1",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Onion Flakes",
                "quantity": "1",
                "units": "tsp"
            },
            {
                "desc": "",
                "name": "Chopped Parsley",
                "quantity": "2",
                "units": "tbsp"
            },
            {
                "desc": "",
                "name": "Margarine",
                "quantity": "0.25",
                "units": "Cup"
            },
            {
                "desc": "",
                "name": "Cayenne Pepper",
                "quantity": "1",
                "units": "\"Pinch\""
            },
            {
                "desc": "",
                "name": "Crumbled Bread",
                "quantity": "2",
                "units": "\"Slices\""
            }
        ],
        "recipeCoverImage": "https://tse1.mm.bing.net/th/id/OIP.Z5_7sbpWkaWZJkN6qd17GgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        "recipeDescription": "This is a recipe that serves approximately 8. It is great to have with a side of vegetables or is fine on its own.",
        "recipeDifficulty": "Intermediate",
        "recipeName": "Tuna Mornay",
        "recipeType": "Dinner",
        "serves": 8,
        "status": "Draft",
        "steps": [
            {
                "desc": "Combine Drained and flaked tuna, onion flakes, lemon juice, parsley and garlic salt. ",
                "name": "",
                "photo": ""
            },
            {
                "desc": "In a pot over the stove, melt the marg and blend in flour and seasonings. Add the milk very gradually and cook until it is thick and smooth, stirring constantly.",
                "name": "White Sauce",
                "photo": ""
            },
            {
                "desc": "Fold in the tuna mixture and breadcrumbs and place the mixture in a casserole dish.",
                "name": "",
                "photo": ""
            },
            {
                "desc": "Cover with potato crisps.",
                "name": "",
                "photo": ""
            },
            {
                "desc": "Cook at 400 degrees F for 20 mins.",
                "name": "Cooking It",
                "photo": "https://tse1.mm.bing.net/th/id/OIP.Z5_7sbpWkaWZJkN6qd17GgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
            }
        ],
        "tagList": [
            "Pescatarian",
            "OTHER"
        ],
        "timeList": {
            "cookingTime": [
                0,
                0
            ],
            "prepTime": [
                0,
                0
            ],
            "totalTime": [
                0,
                40
            ]
        },
        "timeSplit": False,
        "visibility": "Private"
    }

    recipes_dict = {}

    if recipe_num == "0":
        recipes_dict = empty_dict
    elif recipe_num == "1":
        recipes_dict = pancake_dict
    elif recipe_num == "2":
        recipes_dict = tuna_mornay_dict
    else:
        return "Recipe not found", 404

    return render_template('view_recipe.html', recipe_details_dict=recipes_dict) 