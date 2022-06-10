const pool = require('../../../../lib/db');

let db = {};

db.getDataCreatorDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_creator, fullname, status, email, thumbnail, watch, seen, remaining FROM creators WHERE id_creator = ?`,
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

module.exports = db;
