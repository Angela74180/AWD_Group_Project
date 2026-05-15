import unittest
import threading
import time
from selenium import webdriver
from app import create_app, db
from config import TestConfig
from app.models import User, Recipe, Step
from werkzeug.serving import make_server

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

localHost = "http://127.0.0.1:5001/"

class ServerThread(threading.Thread):
    def __init__(self, app):
        super().__init__()
        self.server = make_server("127.0.0.1", 5001, app)

    def run(self):
        self.server.serve_forever()

    def shutdown(self):
        self.server.shutdown()


class SeleniumTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.testApp = create_app(TestConfig)

        cls.app_context = cls.testApp.app_context()
        cls.app_context.push()

        db.create_all()

        cls.server = ServerThread(cls.testApp)
        cls.server.start()

        time.sleep(1)

        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")

        cls.driver = webdriver.Chrome(options=options)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

        cls.server.shutdown()
        cls.server.join()

        db.session.remove()
        db.drop_all()

        cls.app_context.pop()

    def test_user_recipe_relationship(self):
        user = User(username="testUser", email="testUser@test.com")
        user.set_password("abc")

        db.session.add(user)
        db.session.commit()

        recipe = Recipe(
            author_id=user.id,
            name="Toast",
            recipe_type="Breakfast",
            difficulty="Easy",
            serves=1,
            description="Bread",
            visibility="Public",
            status="Draft"
        )

        db.session.add(recipe)
        db.session.commit()

        self.assertEqual(user.recipes[0].name, "Toast")
        self.assertEqual(recipe.author.username, "testUser")

    def test_duplicate_username(self):
        user1 = User(username="same", email="a@test.com")
        user1.set_password("abc")

        user2 = User(username="same", email="b@test.com")
        user2.set_password("abc")

        db.session.add(user1)
        db.session.commit()

        db.session.add(user2)

        with self.assertRaises(Exception):
            db.session.commit()

        db.session.rollback()

    def test_step_ordering(self):
        user = User(username="chef", email="chef@test.com")
        user.set_password("abc")

        db.session.add(user)
        db.session.commit()

        recipe = Recipe(
            author_id=user.id,
            name="Toast",
            recipe_type="Breakfast",
            difficulty="Easy",
            serves=1,
            description="Bread",
            visibility="Public",
            status="Draft"
        )

        db.session.add(recipe)
        db.session.commit()

        step1 = Step(
            recipe_id=recipe.id,
            step_number=2,
            desc="Second"
        )

        step2 = Step(
            recipe_id=recipe.id,
            step_number=1,
            desc="First"
        )

        db.session.add_all([step1, step2])
        db.session.commit()

        steps = recipe.steps

        self.assertEqual(steps[0].step_number, 1)
        self.assertEqual(steps[1].step_number, 2)

    def test_login_page(self):
        user = User(
            username="test123",
            email="test@test.com"
        )
        user.set_password("abc123")

        db.session.add(user)
        db.session.commit()

        self.driver.get(localHost + "login")

        username = self.driver.find_element(By.NAME, "username")
        password = self.driver.find_element(By.NAME, "password")

        username.send_keys("test123")
        password.send_keys("abc123")

        password.send_keys(Keys.RETURN)

        time.sleep(1)

        self.assertIn("127.0.0.1:5001", self.driver.current_url)

    def test_home_page_loads_and_navbar_exists(self):
        self.driver.get("http://127.0.0.1:5001/index")

        self.assertIn("CookBook", self.driver.page_source)

        home_link = self.driver.find_element("link text", "Home")
        explore_link = self.driver.find_element("link text", "Explore")

        self.assertTrue(home_link.is_displayed())
        self.assertTrue(explore_link.is_displayed())