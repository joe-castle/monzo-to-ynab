import os
import requests
from datetime import datetime
from flask import Flask, request, jsonify
from create_ynab_json import create_ynab_json

app = Flask(__name__)

type_array = []
transactions = []
errors = []


def make_log(arg, date=datetime.now().strftime('%d/%m/%Y, %H:%M:%S')):
    return {'date': date}.update(arg)


@app.route('/', methods=['POST'])
def receive_monzo_transaction():
    transaction = create_ynab_json(request.json['data'])

    if request.json['type'] != 'transaction.created':
        type_array.append(make_log({'type': request.json['type']}, transaction['transaction']['date']))

    transactions.append(make_log({'transaction': request.json['type']}, transaction['transaction']['date']))

    r = requests.post(f'https://api.youneedabudget.com/v1/budgets/{os.getenv("BUDGET_ID")}/transactions?access_token='
                      f'{os.getenv("ACCESS_TOKEN")}', json=transaction)

    try:
        r.raise_for_status()
        return 'Done', 201
    except (requests.exceptions.HTTPError, requests.exceptions.Timeout) as e:
        errors.append(make_log({'error': e}))


@app.route('/transactions')
def get_transactions():
    return jsonify(transactions)


@app.route('/type')
def get_types():
    return jsonify(type_array)


@app.route('/errors')
def get_errors():
    return jsonify(errors)


if __name__ == '__main__':
    app.run('0.0.0.0', os.getenv('PORT'))
