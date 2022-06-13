const pool = require('../../../../lib/db');

let db = {};

db.getAllTransactionsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT creators.id_creator, creators.fullname, transactions.nominal, transactions.status, transactions.transaction_date, transactions.transaction_evidence, transactions.payment_method, transactions.id_transaction FROM transactions JOIN creators ON transactions.id_creator = creators.id_creator`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      },
    );
  });
};

db.renewStatusJoinDB = (id_creator, join_date, expired_date, status) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET join_date = ?, expired_date = ?, status = ? WHERE id_creator = ?`,
      [join_date, expired_date, status, id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.updateTransactionStatus = (id_transaction, status) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE transactions SET status = ? WHERE id_transaction = ?`,
      [status, id_transaction],
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
