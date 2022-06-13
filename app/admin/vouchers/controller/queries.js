const pool = require('../../../../lib/db');

let db = {};

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

db.getAllVouchersDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_voucher, nominal_before, nominal_after, updatedAt FROM vouchers`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      },
    );
  });
};

db.getVoucherByIdDB = (id_voucher) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_voucher, nominal_before, nominal_after FROM vouchers WHERE id_voucher = ?`,
      [id_voucher],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result[0]);
      },
    );
  });
};

db.editVoucherByIdDB = (id_voucher, nominal_before, nominal_after) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE vouchers SET nominal_before = ?, nominal_after = ? WHERE id_voucher = ?`,
      [nominal_before, nominal_after, id_voucher],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.deleteVoucherByIdDB = (id_voucher) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM vouchers WHERE id_voucher = ?`, [id_voucher], (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};

module.exports = db;
