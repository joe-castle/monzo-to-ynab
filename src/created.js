const { generate } = require('shortid')

const account_id = process.env.ACCOUNT_ID;

module.exports = ({
  created: date,
  amount,
  id: import_id = generate(),
  description,
  notes,
  counterparty,
  merchant
} = {}) => {
  let payee_name = 'MISSING MERCHANT';
  let memo = description;

  if (description != null && description.startsWith('pot')) {
    payee_name = process.env[description]
  }
  
  if (counterparty && counterparty.name) {
    payee_name = counterparty.name
  } else if (merchant) {
    payee_name = merchant.name
  }

  if (merchant && counterparty.name) {
    memo = `${memo}: ${merchant.name}`
  } else if (notes !== notes) {
    memo = `${memo}: ${notes}`
  }

  return { transaction: {
    account_id, 
    date, 
    amount: amount * 10, 
    payee_name, 
    memo,
    import_id, 
    cleared: "cleared" }
  }
}