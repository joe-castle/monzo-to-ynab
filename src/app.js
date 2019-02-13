const express = require('express')
const bodyParser = require('body-parser')

const created = require('./created')

const typeArray = []
const transactions = []
const errors = []

module.exports = (fetch) => {
  const { BUDGET_ID, ACCESS_TOKEN } = process.env
  const app = express()

  app.use(bodyParser.json())

  app.post('/', (req, res) => {
    const transaction = created(req.body.data)

    if (req.body.type !== 'transaction.created') {
      typeArray.push({ date: transaction.date || (new Date()).toLocaleString(), type: req.body.type, })
    }

    transactions.push({ date: transaction.date || (new Date()).toLocaleString(), transaction: req.body })

    fetch(`https://api.youneedabudget.com/v1/budgets/${BUDGET_ID}/transactions?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(transaction)
    }).then((res) => res.json())
      .then((json) => {
        res.status(201).send('Done')
      })
      .catch((err) => {
        errors.push({ date: (new Date()).toLocaleString(), err })
      })
  })

  app.get('/transactions', (req, res) => {
    res.json(transactions)
  })

  app.get('/types', (req, res) => {
    res.json(typeArray)
  })

  app.get('/errors', (req, res) => {
    res.json(errors)
  })

  return app
}