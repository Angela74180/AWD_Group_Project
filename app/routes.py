from flask import render_template, request, redirect, url_for, session, jsonify
from app import app, db
from flask_login import login_user, logout_user
from sqlalchemy.exc import SQLAlchemyError #############################################################
from app.models import User, Recipe, Ingredient, RecipeIngredient, Tag, RecipeTag, Appliance, RecipeAppliance, Step, Bookmark, ShoppingList
from app.makeRecipeBannerDict import make_recipe_banner_dict

@app.route('/')
@app.route('/index')
def index():
    return render_template("homePage.html")

@app.route("/explore")
def explore():
    recipes_list = []

    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()


    ############################### CHOSEN RECIPES IS WHERE YOU STORE THE RECIPE OBJECTS THAT YOU WANT TO DISPLAY BASED ON YOUR QUERIES 
    ########## IT NEEDS TO BE A LIST 
    chosen_recipes = [Recipe.query.filter_by(id=1).first(), Recipe.query.filter_by(id=2).first()]
    
    
    for recipe in chosen_recipes:
        author = User.query.filter_by(id=recipe.author_id).first().username

        bookmark_on = True
        cart_on = True

        if signed_in:
            bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
            cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()

            if not bookmark:
                bookmark_on = False

            if not cart:
                cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("explore.html", foundRecipes=recipes_list[::-1])




@app.route("/shopping_list")
def shopping_list():

    ############### You will nedd to actually check for a User
    signed_in = True
    
    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    shopping_lists = user.shopping_lists


    recipes_list = []
    for shopping_list in shopping_lists:
        recipe_id = shopping_list.recipe_id
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        author = User.query.filter_by(id=recipe.author_id).first().username
        bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()

        bookmark_on = True
        if not bookmark:
            bookmark_on = False

        cart_on = True
        if not cart:
            cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("shopping_list.html", username=user.username, cartRecipes=recipes_list[::-1])


@app.route("/saved")
def saved():

    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    bookmarks = user.bookmarks


    recipes_list = []
    for bookmark in bookmarks:
        print(bookmark)
        recipe_id = bookmark.recipe_id
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        
        author = User.query.filter_by(id=recipe.author_id).first().username
        bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()

        bookmark_on = True
        if not bookmark:
            bookmark_on = False

        cart_on = True
        if not cart:
            cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("savedPage.html", username=user.username, savedRecipes=recipes_list[::-1])


@app.route("/my-recipes")
def myRecipes():
    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    my_recipes_list = []
    for recipe in user.recipes:
        author = User.query.filter_by(id=recipe.author_id).first().username
        bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()

        bookmark_on = True
        if not bookmark:
            bookmark_on = False

        cart_on = True
        if not cart:
            cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        my_recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("myRecipesPage.html", username=user.username, userRecipes=my_recipes_list[::-1])


@app.route('/publish_recipe', methods=["POST"])
def publish_recipe():
    if request.method == "POST":

        ingredient_names        = request.form.getlist("ingredientName")
        ingredient_quantities   = request.form.getlist("ingredientQuantity")
        ingredient_units        = request.form.getlist("ingredientUnits")
        ingredient_descriptions = request.form.getlist("ingredientDescription")

        if len(ingredient_names) != len(ingredient_quantities) or len(ingredient_quantities) != len(ingredient_units) or len(ingredient_units) != len(ingredient_descriptions):
            raise Exception("Unequal number of ingredient parameters")

        ingredients_list = []

        for i in range(len(ingredient_names)):
            ingredient_name = ingredient_names[i]
            ingredient_quantity = ingredient_quantities[i]
            ingredient_unit = ingredient_units[i]
            ingredient_description = ingredient_descriptions[i]

            ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

            if ingredient == None:
                ingredient = Ingredient(
                    name = ingredient_name
                )
                db.session.add(ingredient)
                db.session.commit()
                
            
            recipe_ingredient = RecipeIngredient(
                ingredient_id = ingredient.id,
                quantity      = ingredient_quantity,
                units         = ingredient_unit,
                desc          = ingredient_description,
                sort_order    = i
            )

            ingredients_list.append(recipe_ingredient)



        tag_names = request.form.getlist("tagName")
        tag_list = []
        for tag_name in (tag_names):
            tag = Tag.query.filter_by(name=tag_name).first()

            if tag == None:
                tag = Tag(
                    name = tag_name
                )
                db.session.add(tag)
                db.session.commit()

            recipe_tag = RecipeTag(
                tag_id = tag.id
            )

            tag_list.append(recipe_tag)




        appliance_names         = request.form.getlist("applianceName")
        appliance_extra_details = request.form.getlist("extraData")
        appliance_descriptions  = request.form.getlist("applianceDescription")

        if len(appliance_names) != len(appliance_extra_details) or len(appliance_extra_details) != len(appliance_descriptions):
            raise Exception("Unequal number of appliance parameters")
        
        appliance_list = []

        for i in range(len(appliance_names)):
            appliance_name = appliance_names[i]
            appliance_extra_data = appliance_extra_details[i]
            appliance_description = appliance_descriptions[i]

            appliance = Appliance.query.filter_by(name=appliance_name).first()

            if appliance == None:
                appliance = Appliance(
                    name = appliance_name
                )
                db.session.add(appliance)
                db.session.commit()

            recipe_appliance = RecipeAppliance(
                appliance_id = appliance.id,
                extra_data   = appliance_extra_data,
                desc         = appliance_description,
                sort_order   = i
            )

            appliance_list.append(recipe_appliance)



        step_names = request.form.getlist("stepName")
        step_descriptions = request.form.getlist("stepDescription")
        step_photos = request.form.getlist("stepPhoto")

        if len(step_names) != len(step_descriptions) or len(step_descriptions) != len(step_photos):
            raise Exception("Unequal number of step parameters")
        
        step_list = []

        for i in range(len(step_names)):
            step_name = step_names[i]
            step_description = step_descriptions[i]
            step_photo = step_photos[i]

            step = Step(
                name        = step_name,
                desc        = appliance_description,
                photo       = step_photo,
                step_number = i
            )

            step_list.append(step)


        if request.form.get("publishButton"):
            status = "Published"
        else:
            status = "Draft"

        recipe = Recipe(
            author_id     = session.get('authorId'),
            # prev_version_id = db.Column(db.Integer, db.ForeignKey("recipe.id")) ####this column needs to be nullable ######
            name          = request.form["recipe_name"],
            recipe_type   = request.form["recipeType"],
            difficulty    = request.form["recipeDifficulty"],
            serves        = request.form["serves"],
            description   = request.form["Description"],
            cover_image   = request.form["coverPhoto"],
            time_split    = bool(request.form.get("timeSplit")),
            prep_minutes  = request.form.get("prepMins", 0),
            cook_minutes  = request.form.get("cookMins", 0),
            total_minutes = request.form.get("totalMins", 0),
            prep_hours    = request.form.get("prepHours", 0),
            cook_hours    = request.form.get("cookHours", 0),
            total_hours   = request.form.get("totalHours", 0),
            visibility    = request.form["visibility"],
            allow_ratings = bool(request.form.get("allowRatings")),
            allow_reviews = bool(request.form.get("allowReviews")),
            status        = status,
            ingredients   = ingredients_list,
            tags          = tag_list,
            appliances    = appliance_list,
            steps         = step_list
        )
        
        try:
            db.session.add(recipe)
            db.session.commit()
            return redirect(url_for("profile"))
        
        except Exception as e:
            app.logger.error(e)
            db.session.rollback()
            error = "Recipe could not be saved."
            return render_template("/create_recipe", error=error)


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



@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            session['authorId'] = user.id
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





@app.route("/updateBookmark", methods=["POST"])
def updateBookmark():
    recipe_id       = request.json.get("recipe_id")
    user_id         = request.json.get("user_id")
    bookmark_status = request.json.get("bookmark_status")

    bookmark = Bookmark.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()

    if not bookmark and bookmark_status == "on":
        bookmark = Bookmark(
            user_id = user_id,
            recipe_id = recipe_id
        )

        try:
            db.session.add(bookmark)
            db.session.commit()
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False})


    elif bookmark and bookmark_status == "off":
        try:
            db.session.delete(bookmark)
            db.session.commit()
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False})

    return jsonify({"success": True})



@app.route("/updateShoppingList", methods=["POST"])
def updateShoppingList():
    recipe_id       = request.json.get("recipe_id")
    user_id         = request.json.get("user_id")
    cart_status = request.json.get("cart_status")

    cart = ShoppingList.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()

    if not cart and cart_status == "on":
        cart = ShoppingList(
            user_id = user_id,
            recipe_id = recipe_id
        )

        try:
            db.session.add(cart)
            db.session.commit()
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False})


    elif cart and cart_status == "off":
        try:
            db.session.delete(cart)
            db.session.commit()
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False})

    return jsonify({"success": True})



@app.route("/profile")
def profile():
    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    my_recipes_list = []
    for recipe in user.recipes:
        author = User.query.filter_by(id=recipe.author_id).first().username
        bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()

        bookmark_on = True
        if not bookmark:
            bookmark_on = False

        cart_on = True
        if not cart:
            cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        my_recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("profilePage.html", username=user.username, userRecipes=my_recipes_list[::-1])



@app.route('/view_recipe/<recipe_num>')
def view_recipe(recipe_num):

    recipes_dict = make_recipe_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in)
    return render_template('view_recipe.html', recipe_details_dict=recipes_dict) 