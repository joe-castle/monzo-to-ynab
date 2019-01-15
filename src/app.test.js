const request = require('supertest')
const fetch = require('fetch-mock')

describe('App tests', () => {
  const mockedFetch = fetch
    .sandbox()
    .mock('*', { "data": "response-from-api "})
  
  const app = request.agent(require('./app')(mockedFetch))
  
  const { merchant } = require('./created.test.json')

  beforeEach(() => {
    mockedFetch.reset()
  })

  it ('Successfully sends a converted transaciton to ynab', (done) => {
    app
      .post('/')
      .set('Accept', 'application/json')
      .send(merchant)
      // .expect(201)
      .expect('Done', done)

    console.log(mockedFetch.lastOptions())
  })
})