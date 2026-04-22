from flask import Flask, render_template

app = Flask(__name__)

@app.route("/profile")
def home():
    return render_template("profile.html")

if __name__ == "__main__":
    app.run(debug=True)