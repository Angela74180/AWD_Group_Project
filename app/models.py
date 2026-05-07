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
    # profile_pic - Will be a blob object that stores the image
    # my_recipes - Will connect to the foreign key for each recipe id
    # my_reviews - Will connect to the foreign key for each review id
    # following - Will connect to the foreign key for each user id
    # followers - Will connect to the foreign key for each user id
    # mutual_friends - Will connect to the foreign key for each user id
    # outgoing_friend_requests - Will connect to the foreign key for each user id
    # incoming_friend_requests - Will connect to the foreign key for each user id
    # my_kitchen - Will connect to the foreign key for their kitchen


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# class Recipe():
# id - Primary Key
# author - Will connect to the foreign key for the user who made it
# version_num - Int to represent which version we are on (0 means a draft)
# recipe_name - A textual name
# allowed_ratings - Bool to indicate if ratings are allowed
# allowed_reviews - Bool to indicate if reviews are allowed
# appliances - List of appliances each with a name, description (can be empty) and Extra Data (can be empty).
# cover_image - Will be a blob object that stores the image
# description - Will be a textual description of a max of 1000 characters
# difficulty - Simple, Intermediate or Challenging
# type - Breakfast, Lunch, Dinner, Dessert, Sweet, Baked Good, Drink, Snack, Side, Other
# serves - an int
# steps - List of steps. Each step has a list containing the Step Name (can be empty), description - textual max 500 characters
# time_split - bool that indicates if the time is split into cooking and prep
# time - dict of total time, prep time and cooking time each a list of 2 ints
# visibility - Private, Public, Friends_Only
# tags - list of tags
# time_stamp - Date Time
# ingredients - List of ingredients, each has a name, a quantity, units (from datalist) and a description (can be empty)



# class Review()
# ...