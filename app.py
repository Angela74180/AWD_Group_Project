from flask import Flask, render_template

app = Flask(__name__)

@app.route("/explore")
def home():
    return render_template("explore.html")

if __name__ == "__main__":
    app.run(debug=True)