require('dotenv').config()
const fetch = require('node-fetch')

const app = require('./app')(fetch)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express server listening on port ${port}`))