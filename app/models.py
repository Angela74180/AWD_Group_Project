from datetime import datetime
from typing import Optional
from app import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy as sa
import sqlalchemy.orm as so

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
 
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=True)
    taste_rating = db.Column(db.Integer, nullable=True)   # 1-5
    accuracy_rating = db.Column(db.Integer, nullable=True)  # 1-5
    timing_rating = db.Column(db.Integer, nullable=True)   # 1-7
    like_count = db.Column(db.Integer, nullable=False, default=0)
 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
 
    # One review per user per recipe
    __table_args__ = (
        db.UniqueConstraint("author_id", "recipe_id", name="uq_review_author_recipe"),
    )
 
    author = db.relationship("User", back_populates="reviews")
    recipe = db.relationship("Recipe", back_populates="reviews")
    liked_by = db.relationship("ReviewLike", back_populates="review", cascade="all, delete-orphan")
 
 
class ReviewLike(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey("review.id"), nullable=False)
    liked_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
 
    __table_args__ = (
        db.UniqueConstraint("user_id", "review_id", name="uq_review_like_user_review"),
    )
 
    user = db.relationship("User", back_populates="review_likes")
    review = db.relationship("Review", back_populates="liked_by")






class User(UserMixin, db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    profile_picture = db.Column(db.Text, nullable=True, default="data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMQQAAAQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMAAAAAAAAAwoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQoAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAEAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0MAAAAAEQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgggAwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMEMAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYgAAAAAAAgwkMIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAwQIAAAAAAAAAAAAAAAAAAAAAAAAMYAAAAAAAAAAAAAAAAAAAQkAAAAAAAAAAAAAAAAAAAAAAIgAAAAAAAAAAAAAAAAAAAAAAQIAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAA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")

    recipes = db.relationship("Recipe", back_populates="author", cascade="all, delete-orphan")
    bookmarks = db.relationship("Bookmark", back_populates="user", cascade="all, delete-orphan")
    shopping_lists = db.relationship("ShoppingList", back_populates="user", cascade="all, delete-orphan")
    reviews      = db.relationship("Review", back_populates="author", cascade="all, delete-orphan")
    review_likes = db.relationship("ReviewLike", back_populates="user", cascade="all, delete-orphan")

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
    prev_version_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=True)
    name = db.Column(db.String(200), nullable=False)
    recipe_type = db.Column(db.String(30), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    serves = db.Column(db.Integer, nullable=False, default=0)
    description = db.Column(db.Text, nullable=False, default="")
    cover_image = db.Column(db.Text, nullable=True)
    time_split = db.Column(db.Boolean, nullable=False, default=False)
    prep_minutes = db.Column(db.Integer, nullable=False, default=0)
    cook_minutes = db.Column(db.Integer, nullable=False, default=0)
    total_minutes = db.Column(db.Integer, nullable=False, default=0)
    prep_hours = db.Column(db.Integer, nullable=False, default=0)
    cook_hours = db.Column(db.Integer, nullable=False, default=0)
    total_hours = db.Column(db.Integer, nullable=False, default=0)
    visibility = db.Column(db.String(20), nullable=False)
    allow_ratings = db.Column(db.Boolean, nullable=False, default=True)
    allow_reviews = db.Column(db.Boolean, nullable=False, default=True)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship("Review", back_populates="recipe", cascade="all, delete-orphan")

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
    shopping_lists = db.relationship("ShoppingList", back_populates="recipe", cascade="all, delete-orphan")


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
    photo = db.Column(db.Text, nullable=True)

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
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    saved_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("user_id", "recipe_id", name="uq_shopping_list_user_recipe"),
    )

    user = db.relationship("User", back_populates="shopping_lists")
    recipe = db.relationship("Recipe", back_populates="shopping_lists")