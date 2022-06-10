const pool = require('../../../../lib/db');

let db = {};

// find creator by email
db.getCreatorByEmailDB = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_creator, email, password, fullname, status, thumbnail FROM creators WHERE email = ${pool.escape(
        email,
      )}`,
      (error, result) => {
        if (error) {
          return reject();
        } else {
          return resolve(result[0]);
        }
      },
    );
  });
};

// insert new creator
db.insertCreatorDB = (fullName, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO creators (fullname, email, password) VALUES (${pool.escape(
        fullName,
      )}, ${pool.escape(email)}, ${pool.escape(password)})`,
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
