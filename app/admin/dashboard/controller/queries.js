const pool = require('../../../../lib/db');

let db = {};

db.getTotalUsersDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT COUNT(*) AS user FROM creators`, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result[0]);
    });
  });
};

db.getActiveMembersDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(status) AS member FROM creators WHERE status = 'Y'`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result[0]);
      },
    );
  });
};

db.getTotalContentsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT COUNT(*) AS content FROM contents`, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result[0]);
    });
  });
};

db.getTotalVouchersDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT COUNT(*) AS voucher FROM vouchers`, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result[0]);
    });
  });
};

module.exports = db;
