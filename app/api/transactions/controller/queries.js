const pool = require('../../../../lib/db');

let db = {};

db.addNewTransactionDB = (id_creator, nominal, transaction_evidence, payment_method) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO transactions (id_creator, nominal, transaction_evidence, payment_method) VALUES (?, ?, ?, ?)`,
      [id_creator, nominal, transaction_evidence, payment_method],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

module.exports = db;
