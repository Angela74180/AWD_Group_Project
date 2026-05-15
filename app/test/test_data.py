import unittest
from app import create_app, db
from config import TestConfig
from app.models import User, Recipe


class BasicTests(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

        user = User(
            id=1,
            username="testuser",
            email="test@example.com"
        )
        user.set_password("bubbles")

        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_password_hashing(self):
        s = db.session.get(User, 1)

        self.assertIsNotNone(s)
        self.assertTrue(s.check_password("bubbles"))
        self.assertFalse(s.check_password("rumbles"))

    def test_signup(self):
        response = self.client.post(
            "/signup",
            data={
                "username": "newuser",
                "email": "test@test.com",
                "password": "abc123",
                "confirm_password": "abc123"
            },
            follow_redirects=True
        )

        user = User.query.filter_by(username="newuser").first()
        self.assertIsNotNone(user)

    def test_duplicate_signup(self):
        user = User(username="test", email="test@test.com")
        user.set_password("abc")

        db.session.add(user)
        db.session.commit()

        response = self.client.post(
            "/signup",
            data={
                "username": "test",
                "email": "another@test.com",
                "password": "123",
                "confirm_password": "123"
            },
            follow_redirects=True
        )

        self.assertIn(b"already in use", response.data)

    def test_create_recipe(self):

        user = User(username="chef", email="chef@test.com")
        user.set_password("abc")

        db.session.add(user)
        db.session.commit()

        # IMPORTANT: follow_redirects so login session persists
        self.client.post(
            '/login',
            data={
                "username": "chef",
                "password": "abc"
            },
            follow_redirects=True
        )

        response = self.client.post(
            "/publish_recipe",
            data={
                "recipe_name": "Toast",
                "recipeType": "Breakfast",
                "recipeDifficulty": "Simple",
                "serves": 1,
                "Description": "Bread",
                "coverPhoto": "",
                "visibility": "Public",

                "ingredientName": ["Bread"],
                "ingredientQuantity": ["2"],
                "ingredientUnits": ["Slices"],
                "ingredientDescription": [""] ,

                "tagName": ["Quick"],

                "applianceName": ["Toaster"],
                "extraData": [""],
                "applianceDescription": [""],

                "stepName": ["Toast bread"],
                "stepDescription": ["Put bread in toaster"],
                "stepPhoto": [""]
            },
            follow_redirects=True
        )

        recipe = Recipe.query.filter_by(name="Toast").first()
        self.assertIsNotNone(recipe)

    def test_login(self):
        response = self.client.post(
            "/login",
            data={
                "username": "testuser",
                "password": "bubbles"
            },
            follow_redirects=True
        )

        self.assertEqual(response.status_code, 200)

    def test_update_password_success(self):

        self.client.post('/login', data={
            "username": "testuser",
            "password": "bubbles"
        }, follow_redirects=True)

        response = self.client.post(
            "/update_password",
            json={
                "current": "bubbles",
                "new": "newpass123"
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.get_json()["success"])