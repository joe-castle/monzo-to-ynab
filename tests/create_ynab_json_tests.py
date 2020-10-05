import unittest

from create_ynab_json import create_ynab_json
from .transactions import transactions

# expect\(transaction\.(\w+)\)\.toBe\((.+)\)
# self.assertEqual(transaction['$1'], $2)


class CreateYnabJsonTests(unittest.TestCase):
    def test_generates_ynab_api_compatible_json_from_merchant(self):
        transaction = create_ynab_json(transactions['merchant'])['transaction']

        self.assertEqual(transaction['date'], '2019-01-12T19:21:03.484Z')
        self.assertEqual(transaction['amount'], -65900)
        self.assertEqual(transaction['payee_name'], 'Mez Turkish Restaurant')
        self.assertEqual(transaction['memo'], 'MEZ TURKISH RESTAURANT BENFLEET      GBR')
        self.assertEqual(transaction['import_id'], 'tx_00009ejQzp000u5I8QOMFd')
        self.assertEqual(transaction['cleared'], 'cleared')

    def test_generates_ynab_api_compatible_json_from_p2p_monzo_payment(self):
        transaction = create_ynab_json(transactions['p2p'])['transaction']

        self.assertEqual(transaction['date'], '2019-01-12T20:14:55.199Z')
        self.assertEqual(transaction['amount'], 11740)
        self.assertEqual(transaction['payee_name'], 'Iftekhar Ahmed')
        self.assertEqual(transaction['memo'], 'Iftekhar Ahmed: Mez Turkish Restaurant')
        self.assertEqual(transaction['import_id'], 'tx_00009ejVnrgQht9cVq0Kgb')
        self.assertEqual(transaction['cleared'], 'cleared')

    def test_generates_ynab_api_compatible_json_from_faster_payment(self):
        transaction = create_ynab_json(transactions['faster'])['transaction']

        self.assertEqual(transaction['date'], '2019-01-08T20:09:59.106Z')
        self.assertEqual(transaction['amount'], 10000)
        self.assertEqual(transaction['payee_name'], 'Joseph Smith')
        self.assertEqual(transaction['memo'], 'Test money')
        self.assertEqual(transaction['import_id'], 'tx_00009ebDJ7r7AybDXbB81C')
        self.assertEqual(transaction['cleared'], 'cleared')

    def test_empty_object(self):
        transaction = create_ynab_json({})['transaction']

        self.assertEqual(transaction['memo'], 'SOMETHING WENT WRONG, CHECK THE TRANSACTION')
        self.assertTrue(transaction['import_id'])


if __name__ == '__main__':
    unittest.main()
