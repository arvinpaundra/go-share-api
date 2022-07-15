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

db.editDataProfileDB = (fullname, email, id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET fullname = ?, email = ? WHERE id_creator = ?`,
      [fullname, email, id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.editProfilePictureDB = (thumbnail, id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET thumbnail = ? WHERE id_creator = ?`,
      [thumbnail, id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.editProfilePasswordDB = (password, id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET password = ? WHERE id_creator = ?`,
      [password, id_creator],
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
