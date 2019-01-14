module.exports = (transaction) => {
  const account_id = process.env.ACCOUNT_ID;
  const {
    created: date,
    amount,
    id: import_id,
    notes: memo
  } = transaction

  let payee_name = null;
  if (transaction.merchant) {
    payee_name = transaction.merchant.name
  } else if (transaction.counterparty.name) {
    payee_name = transaction.counterparty.name
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