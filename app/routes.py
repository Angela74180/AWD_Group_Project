from flask import render_template, request, redirect, url_for, session, jsonify, current_app
from app import db
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy.exc import SQLAlchemyError #############################################################
from app.models import User, Recipe, Ingredient, RecipeIngredient, Tag, RecipeTag, Appliance, RecipeAppliance, Step, Bookmark, ShoppingList
from app.makeRecipeBannerDict import make_recipe_banner_dict
from app.makeRecipeDict import make_recipe_dict
from sqlalchemy.exc import IntegrityError
from app.blueprint import main

def is_number(given_string):
    try:
        float(given_string)
        return True
    except ValueError:
        return False


@main.route('/')
@main.route('/index')
def index():
    userId    = session.get('authorId')
    signed_in = userId is not None

    # Grab the 6 most recent recipes
    recipes = Recipe.query.order_by(Recipe.id.desc()).limit(6).all()

    latest_recipes = []
    for recipe in recipes:
        author   = User.query.filter_by(id=recipe.author_id).first().username
        tag_list = [Tag.query.filter_by(id=rt.tag_id).first().name for rt in recipe.tags]
        latest_recipes.append(make_recipe_banner_dict(recipe, author, tag_list, signed_in=signed_in, bookmark_on=False, cart_on=False))

    return render_template("homePage.html", latest_recipes=latest_recipes)


@main.route("/explore")
def explore():
    recipes_list = []

    signed_in = current_user.is_authenticated

    chosen_recipes = Recipe.query.filter_by(visibility="Public").all()
    
    
    for recipe in chosen_recipes:
        author = recipe.author.username

        bookmark_on = True
        cart_on = True
        if signed_in:
            userId = current_user.id
            user = User.query.filter_by(id=userId).first()

            bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
            cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
            if not bookmark:
                bookmark_on = False
            if not cart:
                cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        recipes_list.append(
            make_recipe_dict(
                recipe,
                author,
                tag_list,

                appliances=[
                    Appliance.query.filter_by(id=ra.appliance_id).first().name
                    for ra in recipe.appliances
                ],

                ingredients=[
                    Ingredient.query.filter_by(id=ri.ingredient_id).first().name
                    for ri in recipe.ingredients
                ],

                steps=[],
                bookmark_on=bookmark_on,
                cart_on=cart_on,
                signed_in=signed_in,
                allowed_to_view=True
            )
        )

    return render_template("explore.html", foundRecipes=recipes_list[::-1])


@main.route("/shopping_list")
def shopping_list():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))
    
    userId = current_user.id
    user = User.query.filter_by(id=userId).first()

    shopping_lists = user.shopping_lists


    recipes_list = []
    ingredients_list = []
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


        recipe = Recipe.query.filter_by(id=recipe_id).first()

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

        ingredients_list.append(ingredients)

    return render_template("shopping_list.html", username=user.username, cartRecipes=recipes_list[::-1], cartIngredients=ingredients_list)




@main.route("/saved")
def saved():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    userId = current_user.id
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


@main.route("/my-recipes")
def myRecipes():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    userId = current_user.id
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


@main.route('/publish_recipe', methods=["POST"])
def publish_recipe():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))


    if request.method == "POST":

        ingredient_names        = request.form.getlist("ingredientName")
        ingredient_quantities   = request.form.getlist("ingredientQuantity")
        ingredient_units        = request.form.getlist("ingredientUnits")
        ingredient_descriptions = request.form.getlist("ingredientDescription")

        if len(ingredient_names) != len(ingredient_quantities) or len(ingredient_quantities) != len(ingredient_units) or len(ingredient_units) != len(ingredient_descriptions):
            app.logger.error("Inconsitent Number of Ingredient Details")
            return render_template('somethingWentWrong.html') 


        ingredients_list = []

        for i in range(len(ingredient_names)):
            ingredient_name = ingredient_names[i].strip()
            ingredient_quantity = ingredient_quantities[i].strip()
            ingredient_unit = ingredient_units[i].strip()
            ingredient_description = ingredient_descriptions[i].strip()

            ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

            # Validate that the ingredient details are valid
            if len(ingredient_name) >= 50 or ingredient_name == "":
                app.logger.error("Ingredient Name Incorrect")
                return render_template('somethingWentWrong.html') 

            if not is_number(ingredient_quantity) or float(ingredient_quantity) < 0:
                app.logger.error("Ingredient Quantity Incorrect")
                return render_template('somethingWentWrong.html') 

            if len(ingredient_unit) >= 50 or ingredient_unit == "":
                app.logger.error("Ingredient Unit Incorrect")
                return render_template('somethingWentWrong.html') 

            if len(ingredient_description) >= 500:
                app.logger.error("Ingredient Description Incorrect")
                return render_template('somethingWentWrong.html') 


            # If an ingredient of the given name has never appeared in a recipe before, it will not be in the database and needs to be added
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
            
            # Validate that the tag details are valid
            if len(tag_name) >= 50 or tag_name == "":
                app.logger.error("Tag Name Incorrect")
                return render_template('somethingWentWrong.html') 

            # If a tag of the given name has never appeared in a recipe before, it will not be in the database and needs to be added
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
            return render_template('somethingWentWrong.html') 
        
        appliance_list = []

        for i in range(len(appliance_names)):
            appliance_name = appliance_names[i].strip()
            appliance_extra_data = appliance_extra_details[i].strip()
            appliance_description = appliance_descriptions[i].strip()

            # Validate that the appliance details are valid
            if len(appliance_name) >= 50 or appliance_name == "":
                app.logger.error("Appliance Name Incorrect")
                return render_template('somethingWentWrong.html') 

            if len(appliance_extra_data) >= 50:
                app.logger.error("Appliance Extra Data Incorrect")
                return render_template('somethingWentWrong.html') 

            if len(appliance_description) >= 500:
                app.logger.error("Appliance Description Incorrect")
                return render_template('somethingWentWrong.html') 



            # If an appliance of the given name has never appeared in a recipe before, it will not be in the database and needs to be added
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
            app.logger.error("Inconsitent Number of Step Details")
            return render_template('somethingWentWrong.html') 
        
        step_list = []

        for i in range(len(step_names)):
            step_name = step_names[i].strip()
            step_description = step_descriptions[i].strip()
            step_photo = step_photos[i].strip()

            if not step_photo:
                step_photo = ""

            # Validate that the step details are valid
            if len(step_name) >= 50:
                app.logger.error("Step Name Incorrect")
                return render_template('somethingWentWrong.html') 

            if len(step_description) >= 500 or step_description == "":
                app.logger.error("Step Description Incorrect")
                return render_template('somethingWentWrong.html') 

            if step_photo != "":
                if not step_photo.startswith("data:image/webp") and not step_photo.startswith("data:image/jpeg") and not step_photo.startswith("data:image/jpg") and not step_photo.startswith("data:image/png"):
                    app.logger.error("Step Photo Incorrect")
                    return render_template('somethingWentWrong.html') 


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



        # Validate the remainder of the recipe table details
        name = request.form["recipe_name"].strip()
        if len(name) >= 200 or name == "":
            app.logger.error("Recipe Name Incorrect")
            return render_template('somethingWentWrong.html') 

        recipe_type = request.form["recipeType"].strip()
        if len(name) >= 30 or recipe_type == "":
            app.logger.error("Recipe Type Incorrect")
            return render_template('somethingWentWrong.html') 

        difficulty = request.form["recipeDifficulty"].strip()
        if len(difficulty) >= 20 or difficulty == "":
            app.logger.error("Recipe Difficulty Incorrect")
            return render_template('somethingWentWrong.html') 

        serves = request.form["serves"].strip()
        if not is_number(serves) or float(serves) < 0:
            app.logger.error("Recipe Serves Incorrect")
            return render_template('somethingWentWrong.html') 

        description = request.form["Description"].strip()
        if len(description) >= 1000 or description == "":
            app.logger.error("Recipe Description Incorrect")
            return render_template('somethingWentWrong.html') 

        cover_image = request.form["coverPhoto"].strip()
        if cover_image != "":
            if not cover_image.startswith("data:image/webp") and not cover_image.startswith("data:image/jpeg") and not cover_image.startswith("data:image/jpg") and not cover_image.startswith("data:image/png"):
                app.logger.error("Recipe Cover Image Incorrect")
                return render_template('somethingWentWrong.html') 
        
        prep_minutes  = request.form.get("prepMins", "0").strip()
        cook_minutes  = request.form.get("cookMins", "0").strip()
        total_minutes = request.form.get("totalMins", "0").strip()
        prep_hours    = request.form.get("prepHours", "0").strip()
        cook_hours    = request.form.get("cookHours", "0").strip()
        total_hours   = request.form.get("totalHours", "0").strip()

        times = [prep_minutes, cook_minutes, total_minutes, prep_hours, cook_hours, total_hours]
        for time in times:
            if not is_number(time) or float(time) < 0:
                app.logger.error("Recipe Timings Incorrect")
                return render_template('somethingWentWrong.html') 

        visibility = request.form["visibility"].strip()
        if len(visibility) >= 20 or visibility == "":
            app.logger.error("Recipe Visibility Incorrect")
            return render_template('somethingWentWrong.html') 

        time_split    = bool(request.form.get("timeSplit"))
        allow_ratings = bool(request.form.get("allowRatings"))
        allow_reviews = bool(request.form.get("allowReviews"))


        # Create the Rcipe object and populate it with the data
        recipe = Recipe(
            author_id     = current_user.id,
            # prev_version_id = db.Column(db.Integer, db.ForeignKey("recipe.id")) ####this column needs to be nullable ######
            name          = name,
            recipe_type   = recipe_type,
            difficulty    = difficulty,
            serves        = serves,
            description   = description,
            cover_image   = cover_image,
            time_split    = time_split,
            prep_minutes  = prep_minutes,
            cook_minutes  = cook_minutes,
            total_minutes = total_minutes,
            prep_hours    = prep_hours,
            cook_hours    = cook_hours,
            total_hours   = total_hours,
            visibility    = visibility,
            allow_ratings = allow_ratings,
            allow_reviews = allow_reviews,
            status        = status,
            ingredients   = ingredients_list,
            tags          = tag_list,
            appliances    = appliance_list,
            steps         = step_list
        )
        
        try:
            db.session.add(recipe)
            db.session.commit()
            app.logger.info("No Errors")
            return redirect(url_for("main.my-recipes"))
        
        except Exception as e:
            current_app.logger.error(e)
            db.session.rollback()
            error = "Recipe could not be saved."
            return render_template("/create_recipe", error=error)


@main.route('/create_recipe/<recipe_num>')
def create_recipe(recipe_num):
    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    authorId = current_user.id
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

    userId = current_user.id
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



@main.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            session['authorId'] = user.id
            return redirect(url_for('main.index'))

        return render_template('loginPage.html', error="Invalid credentials")

    return render_template('loginPage.html')


@main.route('/signup', methods=['GET', 'POST'])
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
            return redirect(url_for('main.login'))

        except IntegrityError:
            db.session.rollback()
            return render_template(
                'signupPage.html',
                error="Username or email already exists"
            )

    return render_template('signupPage.html')



@main.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("main.index"))





@main.route("/updateBookmark", methods=["POST"])
def updateBookmark():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    recipe_id       = request.json.get("recipe_id")
    user_id         = current_user.id
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



@main.route("/updateShoppingList", methods=["POST"])
def updateShoppingList():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    recipe_id       = request.json.get("recipe_id")
    user_id         = current_user.id
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



@main.route("/profile")
def profile():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    userId = current_user.id
    user = User.query.filter_by(id=userId).first()

    my_recipes_list = []
    for recipe in user.recipes:
        author      = User.query.filter_by(id=recipe.author_id).first().username
        bookmark_on = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first() is not None
        cart_on     = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first() is not None
        tag_list    = [Tag.query.filter_by(id=rt.tag_id).first().name for rt in recipe.tags]
        my_recipes_list.append(make_recipe_banner_dict(recipe, author, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("profilePage.html",
        user=user,
        username=user.username,
        userRecipes=my_recipes_list[::-1],
        recipecount=len(my_recipes_list)
    )


@main.route("/update_username", methods=["POST"])
@login_required
def update_username():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    new_name = request.get_json().get("username", "").strip()

    if not new_name:
        return jsonify(success=False, message="Name cannot be empty.")

    existing = User.query.filter_by(username=new_name).first()
    if existing and existing.id != current_user.id:
        return jsonify(success=False, message="Username already taken.")

    current_user.username = new_name
    db.session.commit()
    return jsonify(success=True)


@main.route("/upload_avatar", methods=["POST"])
@login_required
def upload_avatar():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

    image_data = request.get_json().get("image")

    if not image_data:
        return jsonify(success=False, message="No image provided.")

    approx_bytes = len(image_data) * 0.75
    if approx_bytes > 150 * 1024:
        return jsonify(success=False, message="Image too large. Please upload under 100KB.")

    current_user.profile_picture = image_data
    db.session.commit()
    return jsonify(success=True)


@main.route("/update_password", methods=["POST"])
@login_required
def update_password():

    signed_in = current_user.is_authenticated

    if not signed_in:
        return redirect(url_for("main.need_to_be_logged_in"))

        
    data   = request.get_json()
    current = data.get("current")
    new_pw  = data.get("new")

    if not current_user.check_password(current):
        return jsonify(success=False, message="Current password is incorrect.")

    if not new_pw or len(new_pw) < 3:
        return jsonify(success=False, message="New password must be at least 3 characters.")

    current_user.set_password(new_pw)
    db.session.commit()
    return jsonify(success=True)


@main.route('/view_recipe/<recipe_num>')
def view_recipe(recipe_num):

    signed_in = current_user.is_authenticated

    allowed_to_view=True

    recipe = Recipe.query.filter_by(id=recipe_num).first()

    author = User.query.filter_by(id=recipe.author_id).first().username

    bookmark_on = True
    cart_on = True
    if signed_in:
        userId = current_user.id
        user = User.query.filter_by(id=userId).first()

        bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
        if not bookmark:
            bookmark_on = False
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




@main.route("/outer_profile/<author_id>")
def outer_profile(author_id):

    signed_in = current_user.is_authenticated

    author = User.query.filter_by(id=author_id).first()

    their_recipes_list = []
    for recipe in author.recipes:
        author_username = author.username

        bookmark_on = True
        cart_on = True
        if signed_in:
            userId = current_user.id
            user = User.query.filter_by(id=userId).first()

            bookmark = Bookmark.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
            cart = ShoppingList.query.filter_by(user_id=userId, recipe_id=recipe.id).first()
            if not bookmark:
                bookmark_on = False
            if not cart:
                cart_on = False

        tag_list = []
        
        for recipeTag in recipe.tags:
            tag_list.append(Tag.query.filter_by(id=recipeTag.tag_id).first().name)

        their_recipes_list.append(make_recipe_banner_dict(recipe, author_username, tag_list, bookmark_on, cart_on, signed_in=signed_in))

    return render_template("outerProfilePage.html", authorUsername=author_username, authorRecipes=their_recipes_list[::-1], authorProfilePic=author.profile_picture)


@main.route("/need_to_be_logged_in")
def need_to_be_logged_in():
    return render_template("needLogin.html")
