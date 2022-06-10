const pool = require('../../../../lib/db');

let db = {};

db.getVouchersDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT id_voucher, nominal_after FROM vouchers`, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
};

db.addNewVoucherDB = (nominal_after) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO vouchers (nominal_after) VALUE (?)`, [nominal_after], (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};

module.exports = db;
