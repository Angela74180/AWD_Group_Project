# AWD_Group_Project
Repository for the UWA Agile Web Development 2026 Group Project

CookBook is a website that allows users to create their own recipes and allows other users to see and review those recipes. Users can bookmark recipes to return to, or add them to a shopping cart that will compile a shopping list of ingredients for them. 

|  UWA ID  |        Name         |  Github User Name  |
|----------|---------------------|--------------------|
| 24223498 | Angela Hewitt       | Angela74180        |
| 22971029 | Aiden Blampain      | aidenblampain      |
| 24469587 | Grace Wong          | ix-cyn             |
| 23994884 | Kefan Yang          | 272mpzgqvk-create  |




Launching the application:

Python3:
Ensure you have python3 installed.


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
ensure Selenium is installed: pip install selenium 

Unittest file (test_data.py): python -m unittest app.test.test_data
Selenium file: python -m unittest app.test.test_selenium




