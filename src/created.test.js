const created = require('./created')
const json = require('./created.test.json')

describe('transaction.created function', () => {
  it('Generates a YNAB API compatible object from a standard merchant transaction', () => {
    const { transaction } = created(json.merchant)

    expect(transaction.account_id).toBe(process.env.ACCOUNT_ID)
    expect(transaction.date).toBe('2019-01-12T19:21:03.484Z')
    expect(transaction.amount).toBe(-65900)
    expect(transaction.payee_name).toBe('Mez Turkish Restaurant')
    expect(transaction.memo).toBe('MEZ TURKISH RESTAURANT BENFLEET      GBR')
    expect(transaction.import_id).toBe('tx_00009ejQzp000u5I8QOMFd')
    expect(transaction.cleared).toBe('cleared')
  })

  it('Generates a YNAB API compatible object from a p2p monzo payment, i.e. split bill', () => {
    const { transaction } = created(json.p2p)

    expect(transaction.account_id).toBe(process.env.ACCOUNT_ID)
    expect(transaction.date).toBe('2019-01-12T20:14:55.199Z')
    expect(transaction.amount).toBe(11740)
    expect(transaction.payee_name).toBe('Iftekhar Ahmed')
    expect(transaction.memo).toBe('Iftekhar Ahmed: Mez Turkish Restaurant')
    expect(transaction.import_id).toBe('tx_00009ejVnrgQht9cVq0Kgb')
    expect(transaction.cleared).toBe('cleared')
  })

  it('Generates a YNAB API compatible object from a faster payment, i.e. bank transfer', () => {
    const { transaction } = created(json.faster)

    expect(transaction.account_id).toBe(process.env.ACCOUNT_ID)
    expect(transaction.date).toBe('2019-01-08T20:09:59.106Z')
    expect(transaction.amount).toBe(10000)
    expect(transaction.payee_name).toBe('Joseph Smith')
    expect(transaction.memo).toBe('Test money')
    expect(transaction.import_id).toBe('tx_00009ebDJ7r7AybDXbB81C')
    expect(transaction.cleared).toBe('cleared')
  })

  it('Test empty object passed in', () => {
    const { transaction } = created({})

    expect(transaction.memo).toBe('SOMETHING WENT WRONG, CHECK THE TRANSACTION')
  })
})