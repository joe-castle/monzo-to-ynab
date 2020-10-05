import uuid
import os


def created(m):
    payee_name = 'MISSING MERCHANT'
    memo = m['description'] or 'SOMETHING WENT WRONG, CHECK THE TRANSACTION'

    if m['counterparty'] and m['counterparty']['name']:
        payee_name = m['counterparty']
    elif m['merchant']:
        payee_name = m['merchant']['name']

    if m['merchant'] and m['counterparty'] and m['counterparty']['name']:
        memo = f"{memo}: {m['merchant']['name']}"
    elif m['notes'] is not None:
        memo = f"{memo}: {m['notes']}"

    return {'transaction': {
        'account_id': os.getenv('ACCOUNT_ID'),
        'date': m['created'],
        'amount': m['amount'] * 10,
        'payee_name': payee_name,
        'memo': memo,
        'import_id': str(uuid.uuid4()),
        'cleared': 'cleared'
    }}
