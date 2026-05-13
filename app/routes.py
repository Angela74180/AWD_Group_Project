from flask import render_template, request, redirect, url_for, session, jsonify
from app import app, db
from flask_login import login_user, logout_user
from sqlalchemy.exc import SQLAlchemyError #############################################################
from app.models import User, Recipe, Ingredient, RecipeIngredient, Tag, RecipeTag, Appliance, RecipeAppliance, Step, Bookmark, ShoppingList
from app.makeRecipeBannerDict import make_recipe_banner_dict
from app.makeRecipeDict import make_recipe_dict
from sqlalchemy.exc import IntegrityError

from flask import jsonify

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
    chosen_recipes = Recipe.query.filter_by(visibility="Public").all()
    
    
    for recipe in chosen_recipes:
        author = recipe.author.username

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

        recipes_list.append(make_recipe_dict(recipe,author,tag_list,appliances=[],ingredients=[],steps=[],bookmark_on=bookmark_on,cart_on=cart_on,signed_in=signed_in,allowed_to_view=True))

    return render_template("explore.html", foundRecipes=recipes_list[::-1])



def explore():
    return render_template("explore.html")

@app.route("/api/recipes")
def api_recipes():

    db_recipes = Recipe.query.all()

    data = []

    for recipe in db_recipes:
        data.append({
            "title": recipe.name,
            "difficulty": recipe.difficulty,
            "time": recipe.total_minutes,
            "cuisine": recipe.recipe_type,
            "tags": [t.tag.name for t in recipe.tags]
        })

    return jsonify(data)

@app.route("/api/tags")
def api_tags():
    tags = Tag.query.all()
    return jsonify([t.name for t in tags])

@app.route("/api/filters")
def api_filters():

    cuisines = sorted({r.recipe_type for r in Recipe.query.all()})
    difficulties = sorted({r.difficulty for r in Recipe.query.all()})
    
    DIET_TAGS = {
        "Vegan",
        "Vegetarian",
        "Gluten-free",
        "Dairy-free"
    }

    all_tags = [t.name for t in Tag.query.all()]

    diet_tags = sorted([
        tag for tag in all_tags
        if tag in DIET_TAGS
    ])

    return jsonify({
        "cuisines": cuisines,
        "difficulties": difficulties,
        "tags": diet_tags
    })

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

        # print(recipe.author_id)
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
        
        ingredients_list = []

    return render_template("shopping_list.html", username=user.username, cartRecipes=recipes_list[::-1], cartIngredients=ingredients_list)


@app.route("/saved")
def saved():

    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    bookmarks = user.bookmarks


    recipes_list = []
    for bookmark in bookmarks:
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
                desc        = step_description,
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
    ############### You will nedd to actually check for a User
    signed_in = True


    authorId = session.get('authorId')
    author = User.query.filter_by(id=authorId).first().username

    empty_dict = {
        "id": 0,
        "recipeId": 0,
        "allowRatings": True,
        "allowReviews": True,
        "appliances": [{"desc": "", "extraData": "", "name": ""}],
        "authorId": authorId,
        "author": author,
        "ingredients": [{"desc": "", "name": "", "quantity": "", "units": ""}],
        "recipeCoverImage": "",
        "recipeDescription": "",
        "recipeDifficulty": "Simple",
        "recipeName": "",
        "recipeType": "Breakfast",
        "serves": "",
        "status": "Draft",
        "steps": [{"desc": "", "name": "", "photo": ""}],
        "tagList": [""],
        "timeList": {"cookingTime": ["",""], "prepTime": ["",""], "totalTime": ["",""]},
        "timeSplit": False,
        "visibility": "Private",
        "bookmark_on": False,
        "cart_on": False,
        "signed_in": signed_in,
        "allowed_to_view": True
    }

    if recipe_num == "0":
        return render_template('create_recipe.html', recipe_details_dict=empty_dict) 

        
    allowed_to_view=True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()

    recipe = Recipe.query.filter_by(id=recipe_num).first()

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

    appliances = []
    for recipeAppliance in recipe.appliances:
        appliance = Appliance.query.filter_by(id=recipeAppliance.appliance_id).first()
        recipe_appliance = RecipeAppliance.query.filter_by(appliance_id=appliance.id, recipe_id=recipe.id).first()
        appliance_dict = {
            "name": appliance.name,
            "extraData": recipe_appliance.extra_data,
            "desc": recipe_appliance.desc
        }
        appliances.append(appliance_dict)


    ingredients = []
    for recipeIngredient in recipe.ingredients:
        ingredient = Ingredient.query.filter_by(id=recipeIngredient.ingredient_id).first()
        recipe_ingredient = RecipeIngredient.query.filter_by(ingredient_id=ingredient.id, recipe_id=recipe.id).first()

        quantity = float(recipe_ingredient.quantity)

        # If it's a whole number, return int
        if quantity.is_integer():
            quantity = int(quantity)


        ingredient_dict = {
            "name": ingredient.name,
            "quantity": quantity,
            "units": recipe_ingredient.units,
            "desc": recipe_ingredient.desc
        }
        ingredients.append(ingredient_dict)


    steps = []
    for recipeStep in recipe.steps:
        # step = Step.query.filter_by(id=recipeStep.step_id).first()
        step = Step.query.filter_by(id=recipeStep.id, recipe_id=recipe.id).first()
        step_dict = {
            "name": step.name,
            "step_number": step.step_number,
            "desc": step.desc,
            "photo": step.photo
        }
        steps.append(step_dict)


    recipes_dict = make_recipe_dict(recipe, author, tag_list, appliances, ingredients, steps, bookmark_on, cart_on, signed_in=signed_in, allowed_to_view=allowed_to_view)

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

        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)

        try:
            db.session.commit()
            return redirect(url_for('login'))

        except IntegrityError:
            db.session.rollback()
            return render_template(
                'signupPage.html',
                error="Username or email already exists"
            )

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

    ############### You will nedd to actually check for a User
    signed_in = True

    userId = session.get('authorId')
    user = User.query.filter_by(id=userId).first()


    #########################Currently hardcoded so that anyone can view anything
    allowed_to_view=True

    recipe = Recipe.query.filter_by(id=recipe_num).first()

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

    appliances = []
    for recipeAppliance in recipe.appliances:
        appliance = Appliance.query.filter_by(id=recipeAppliance.appliance_id).first()
        recipe_appliance = RecipeAppliance.query.filter_by(appliance_id=appliance.id, recipe_id=recipe.id).first()
        appliance_dict = {
            "name": appliance.name,
            "extraData": recipe_appliance.extra_data,
            "desc": recipe_appliance.desc
        }
        appliances.append(appliance_dict)


    ingredients = []
    for recipeIngredient in recipe.ingredients:
        ingredient = Ingredient.query.filter_by(id=recipeIngredient.ingredient_id).first()
        recipe_ingredient = RecipeIngredient.query.filter_by(ingredient_id=ingredient.id, recipe_id=recipe.id).first()

        quantity = float(recipe_ingredient.quantity)

        # If it's a whole number, return int
        if quantity.is_integer():
            quantity = int(quantity)


        ingredient_dict = {
            "name": ingredient.name,
            "quantity": quantity,
            "units": recipe_ingredient.units,
            "desc": recipe_ingredient.desc
        }
        ingredients.append(ingredient_dict)


    steps = []
    for recipeStep in recipe.steps:
        # step = Step.query.filter_by(id=recipeStep.step_id).first()
        step = Step.query.filter_by(id=recipeStep.id, recipe_id=recipe.id).first()
        step_dict = {
            "name": step.name,
            "step_number": step.step_number,
            "desc": step.desc,
            "photo": step.photo
        }
        steps.append(step_dict)


    recipes_dict = make_recipe_dict(recipe, author, tag_list, appliances, ingredients, steps, bookmark_on, cart_on, signed_in=signed_in, allowed_to_view=allowed_to_view)
    return render_template('view_recipe.html', recipe_details_dict=recipes_dict) 