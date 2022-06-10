const pool = require('../lib/db');

let db = {};

db.getStatusSubscription = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_creator, status, expired_date FROM creators WHERE id_creator = ?`,
      [id_creator],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result[0]);
      },
    );
  });
};

db.resetStatus = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE creators SET status = 'N' WHERE id_creator = ?`, [id_creator], (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};

module.exports = db;
