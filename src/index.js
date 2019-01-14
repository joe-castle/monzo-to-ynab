const app = require('./app')

process.env = {
  BUDGET_ID: '1cf74e56-c4fc-4822-aefb-63556d083356',
  ACCESS_TOKEN: '8e3c72d2d918271a43841a7b45192d49ad2cbf3fab6bdde9a4e23b999272c77d',
  ACCOUNT_ID: 'ddba61ad-b112-4cc4-8868-a87b8611923a'
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express server listening on port ${port}`))