from datetime import datetime
from app import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy as sa
import sqlalchemy.orm as so


class User(UserMixin, db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    recipes = db.relationship("Recipe", back_populates="author", cascade="all, delete-orphan")
    bookmarks = db.relationship("Bookmark", back_populates="user", cascade="all, delete-orphan")
    shopping_lists = db.relationship("ShoppingList", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Recipe(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    recipe_type = db.Column(db.String(30), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    serves = db.Column(db.Integer, nullable=False, default=0)
    description = db.Column(db.Text, nullable=False, default="")
    cover_image_url = db.Column(db.String(500))
    time_split = db.Column(db.Boolean, nullable=False, default=False)
    prep_minutes = db.Column(db.Integer, nullable=False, default=0)
    cook_minutes = db.Column(db.Integer, nullable=False, default=0)
    total_minutes = db.Column(db.Integer, nullable=False, default=0)
    visibility = db.Column(db.String(20), nullable=False)
    allow_ratings = db.Column(db.Boolean, nullable=False, default=True)
    allow_reviews = db.Column(db.Boolean, nullable=False, default=True)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    author = db.relationship("User", back_populates="recipes")
    ingredients = db.relationship(
        "RecipeIngredient",
        back_populates="recipe",
        order_by="RecipeIngredient.sort_order",
        cascade="all, delete-orphan",
    )
    appliances = db.relationship(
        "RecipeAppliance",
        back_populates="recipe",
        order_by="RecipeAppliance.sort_order",
        cascade="all, delete-orphan",
    )
    tags = db.relationship("RecipeTag", back_populates="recipe", cascade="all, delete-orphan")
    steps = db.relationship(
        "Step",
        back_populates="recipe",
        order_by="Step.step_number",
        cascade="all, delete-orphan",
    )
    bookmarks = db.relationship("Bookmark", back_populates="recipe", cascade="all, delete-orphan")
    shopping_list_items = db.relationship(
        "ShoppingListItem", back_populates="recipe", cascade="all, delete-orphan"
    )


class Ingredient(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    recipe_uses = db.relationship("RecipeIngredient", back_populates="ingredient")


class RecipeIngredient(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredient.id"), nullable=False)
    quantity = db.Column(db.Numeric(10, 4))
    units = db.Column(db.String(30))
    desc = db.Column(db.Text)
    sort_order = db.Column(db.Integer, nullable=False)

    recipe = db.relationship("Recipe", back_populates="ingredients")
    ingredient = db.relationship("Ingredient", back_populates="recipe_uses")


class Appliance(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    recipe_uses = db.relationship("RecipeAppliance", back_populates="appliance")


class RecipeAppliance(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    appliance_id = db.Column(db.Integer, db.ForeignKey("appliance.id"), nullable=False)
    extra_data = db.Column(db.String(100))
    desc = db.Column(db.Text)
    sort_order = db.Column(db.Integer, nullable=False)

    recipe = db.relationship("Recipe", back_populates="appliances")
    appliance = db.relationship("Appliance", back_populates="recipe_uses")


class Tag(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    recipe_uses = db.relationship("RecipeTag", back_populates="tag")


class RecipeTag(db.Model):

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tag.id"), primary_key=True)

    recipe = db.relationship("Recipe", back_populates="tags")
    tag = db.relationship("Tag", back_populates="recipe_uses")


class Step(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    step_number = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100))
    desc = db.Column(db.String(500), nullable=False)
    photo_url = db.Column(db.String(500))

    __table_args__ = (
        db.UniqueConstraint("recipe_id", "step_number", name="uq_step_recipe_number"),
    )

    recipe = db.relationship("Recipe", back_populates="steps")


class Bookmark(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    saved_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("user_id", "recipe_id", name="uq_bookmark_user_recipe"),
    )

    user = db.relationship("User", back_populates="bookmarks")
    recipe = db.relationship("Recipe", back_populates="bookmarks")


class ShoppingList(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="shopping_lists")
    items = db.relationship(
        "ShoppingListItem", back_populates="shopping_list", cascade="all, delete-orphan"
    )


class ShoppingListItem(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    shopping_list_id = db.Column(db.Integer, db.ForeignKey("shopping_list.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    added_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint(
            "shopping_list_id", "recipe_id", name="uq_shopping_item_list_recipe"
        ),
    )

    shopping_list = db.relationship("ShoppingList", back_populates="items")
    recipe = db.relationship("Recipe", back_populates="shopping_list_items")
