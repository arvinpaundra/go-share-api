const pool = require('../../../../lib/db');

let db = {};

db.getEmailAndPasswordAdminDB = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_admin, fullname, email, password FROM admin WHERE email = ?`,
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result[0]);
      },
    );
  });
};

module.exports = db;
