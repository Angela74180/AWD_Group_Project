# AWD_Group_Project
Repository for the UWA Agile Web Development 2026 Group Project

CookBook is a website that allows users to create their own recipes and allows other users to see and review those recipes. Users can bookmark recipes to return to, or add them to a shopping cart that will compile a shopping list of ingredients for them. 


Detailed Break Down of Features:

Recipe Banners:
Recipe banners are used throughout numerous pages. They are a include a few details about the content of a recipe and are designed to give users an idea of what the recipe will be about. Clicking on them will take the user to the view_recipe page where they can view the recipe in full.
If a user is logged in, above each recipe banner will be 2 icons, a bookmark and a cart. If they click the bookmark, it will add the recipe to their list of saved recipes (viewable on the saved_recipes page) and if they click the cart it will add the recipe to their shopping list (viewable on the shopping_list page)

View Recipe Page:
This Page displays all relevant details of a recipe in a readable manner. At the bottom there is also a section where logged in users can leave reviews and like each other's reviews. Users can also save recipes and add them to their cart using the icons at the top of the page.

Home Page (Accessible to logged in or logged out users):
Allows Users to see a random selection of 6 (public) recipes from the database and presents them as recipe banner.

Explore Page (Accessible to logged in or logged out users):
Allows users to set requirements for a recipe to meet, and recipes that meet those requirements will be shown as recipe banners. Users can search for recipes which will look for recipes that include their input in their heading. They can also apply filters. They can filter a recipe by type, difficulty and time. They can also add other requirements in the form of Tags, Ingredients and Appliances. Adding Tags and Ingredients will restrict the displayed recipes to only include those that have the given tags and ingredients. For each appliance included, recipes that contain that appliance will not be shown. (For example if you don't have an air fryer you might include it here so recipes inclduing it don't show up). Applying the filters will restrict the displayed recipe banners to only those that meet the given requirements.

Create a Recipe Page (Accessible to logged in users only):
Users are able to fill out a form containing the details of a recipe and submit it to the database. They are able to add numerous tags, ingredients, appliances and steps. They are also able to dictate whether the recipe is private and only visible to them, or public.

My Recipes Page (Accessible to logged in users only):
This page displays to the user a recipe banner of all the recipes that they have created, with the most recent at the top. It allso allows them to hit the edit recipe button which will direct them to the create a recipe page, but will the form filled out with the contents of the given recipe. As we wanted to allow versioning (i.e we wanted users to be able to save an earlier version of a recipe before the creator made a change that they didn't like), when the recipe is published, it is published as a new recipe rather than replacing the old one.

Saved Paged (Accessible to logged in users only):
This page displays to the user all the recipes they have bookmarked. If the bookmark is removed whilst on this page, we didn't want to immediately remove it incase it was a misclick, so the relevant recipe banner will remain until the page is reloaded.

Shopping List Page (Accessible to logged in users only):
This page displays to the user all the recipes they have put in their cart. If the cart is removed whilst on this page, we didn't want to immediately remove it incase it was a misclick, so the relevant recipe banner will remain until the page is reloaded. When users click the Make Shopping List button, it will create a page which creates a shopping list. Like ingredients are grouped together, however as ingredients can have descriptions (e.g 2 recipes might use Bananas but the description for one might be that you should use overripe bananas and the other may not say that), we didn't want to combine the quantities as the descriptions may distinguish the 2 ingredients differently.

Profile Page (Accessible to logged in users only):
A page that displays profile details to the user and allows them to change them. It allows the user to view and edit their username and their profile picture. It allows them to change their password as well. It also has a seperate tab that allows the user to see recipe banners for all the recipes they have created.

Login Page:
Allows users to login. It takes their username and password and authenticates them.

Sign Up Page:
Allows new users to create an account. It takes a username, email and password and adds the user to the database, with teh passwords stored a s a salted hash.




|  UWA ID  |        Name         |  Github User Name  |
|----------|---------------------|--------------------|
| 24223498 | Angela Hewitt       | Angela74180        |
| 22971029 | Aiden Blampain      | aidenblampain      |
| 24469587 | Grace Wong          | ix-cyn             |
| 23994884 | Kefan Yang          | 272mpzgqvk-create  |




Launching the application:

NOTE: The selenium tests can only be run in a Windows Command Prompt (and possibly a pure Linux Terminal Window (not in WSL), but we haven't tested this)
This May mean that you want to consider this during the installation.

python3:
Ensure you have python3 installed.

sqlite3:
Ensure you have sqlite3 installed.


Cloning the Github Repository:
Open a terminal window and navigate to a location where you would like the repository clone to go.
In the terminal window, type:
git clone https://github.com/Angela74180/AWD_Group_Project.git

This will clone the repository.
Now Navigate into AWD_Group_Project
cd AWD_Group_Project


Creating a venv:
Run the following code to create a virtual environment:
python3 -m venv venv


Activating the Venv:

Activate the venv. If you are using Linux, use the command:
source venv/bin/activate

If you are using a Microsoft Windows command prompt window, use the command:
venv\Scripts\activate

If you are on Windows but are using PowerShell instead of the command prompt, use the command:
venv\Scripts\Activate.ps1


Install Requirements.txt:
Use the following command to install the requirements:
pip install -r requirements.txt


Upgrade the Database:
Use the following command to create the empty tables in the database:
flask db upgrade


Include the Database Contents:
We have a sparsely populated database. If you want to include it, do the following:
sqlite3 app.db < restore_backup.sql

If you don't want to Populate the database, skip this step.


Flask Run
To start the appliaction, use the following command:
flask run

This will open the application on a local host. Navigate to the url it provides you.
(Should look something like: http://127.0.0.1:5000) 




Running the test files:
Ensure Selenium is installed: 
pip install selenium 

Unittest file (test_data.py) run the following in the terminal window: 
python -m unittest app.test.test_data

Selenium file: 
This file MUST be run in Windows Command Prompt or Linux Terminal Window (untested) and cannot be done through WSL.
python -m unittest app.test.test_selenium