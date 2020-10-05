import unittest
from app import app
from.transactions import transactions


class AppTests(unittest.TestCase):
    def setUp(self):
        app.testing = True

        with app.test_client() as client:
            self.client = client

    def test_sends_converted_transaction_to_ynab(self):
        res = self.client.post('/', data={'data': transactions['merchant']})

        self.assertEqual(res.data, 'Done')


if __name__ == '__main__':
    unittest.main()
