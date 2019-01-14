module.exports = (transaction) => {
  const account_id = process.env.ACCOUNT_ID;
  let {
    created: date,
    amount,
    id: import_id,
    description: memo = 'SOMETHING WENT WRONG, CHECK THE TRANSACTION',
    notes
  } = transaction
  let payee_name = 'MISSING MERCHANT';

  if (transaction.counterparty && transaction.counterparty.name) {
    payee_name = transaction.counterparty.name
  } else if (transaction.merchant) {
    payee_name = transaction.merchant.name
  }

  if (transaction.merchant && transaction.counterparty.name) {
    memo = `${memo}: ${transaction.merchant.name}`
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