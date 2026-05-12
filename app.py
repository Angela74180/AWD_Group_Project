<<<<<<< HEAD
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import app, db

if __name__ == '__main__':
    app.run(debug=True)

@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db}
=======
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/profile")
def home():
    return render_template("profile.html")

if __name__ == "__main__":
    app.run(debug=True)
>>>>>>> e9a5f701777a72781aad79c3ba0d09b662b29bb3
