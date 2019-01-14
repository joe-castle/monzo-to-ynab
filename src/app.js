const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const created = requre('./created')

const app = express()

const typeArray = []
const errors = []

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const transaction = created(req.body.data)

  if (req.body.type !== 'transaction.created') {
    typeArray.push(req.body.type)
  }

  fetch(`https://api.youneedabudget.com/v1/budgets/${process.env.BUDGET_ID}/transactions?access_token=${process.env.ACCESS_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transaction)
  }).then(res => res.json())
    .then(json => {
      // res.status(201).send('Done')
      res.json(json)
    })
    .catch((err) => {
      errors.push(err)
    })
})

app.get('/types', (req, res) => {
  res.json(typeArray)
})

app.get('/errors', (req, res) => {
  res.json(errors)
})

module.exports = app;