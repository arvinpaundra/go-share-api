const pool = require('../../../../lib/db');

let db = {};

db.getAllCreatorsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_creator, fullname, email, status, thumbnail FROM creators`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      },
    );
  });
};

db.getCreatorByIdDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_creator, fullname, email, status, thumbnail FROM creators WHERE id_creator = ?`,
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

db.editCreatorByIdDB = (id_creator, fullname, email, status, thumbnail) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET fullname = ?, email = ?, status = ?, thumbnail = ? WHERE id_creator = ?`,
      [fullname, email, status, thumbnail, id_creator],
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
