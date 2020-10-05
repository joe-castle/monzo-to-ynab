import uuid
import os
from datetime import datetime


def create_ynab_json(m):
    payee_name = 'MISSING MERCHANT'
    memo = m.get('description', 'SOMETHING WENT WRONG, CHECK THE TRANSACTION')

    try:
        if m['counterparty'] and m['counterparty']['name']:
            payee_name = m['counterparty']['name']
        elif m['merchant']:
            payee_name = m['merchant']['name']

        if m['merchant'] and m['counterparty'] and m['counterparty']['name']:
            memo = f"{memo}: {m['merchant']['name']}"
    except KeyError as err:
        print(f'Error reading dict: {err}')

    return {'transaction': {
        'account_id': os.getenv('ACCOUNT_ID'),
        'date': m.get('created', datetime.now()),
        'amount': m.get('amount', 0) * 10,
        'payee_name': payee_name,
        'memo': memo,
        'import_id': m.get('id', str(uuid.uuid4())),
        'cleared': 'cleared'
    }}
