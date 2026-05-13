import unittest
from app import create_app, db
from config import TestConfig
from app.models import User

class BasicTests(unittest.TestCase):

    def setUp(self):
        testApp = create_app(TestConfig)
        self.app_context = testApp.app_context()
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
        s = User.query.get(1)

        self.assertIsNotNone(s)

        self.assertTrue(s.check_password("bubbles"))
        self.assertFalse(s.check_password("rumbles"))