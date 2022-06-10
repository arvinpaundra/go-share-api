const pool = require('../../../../lib/db');

let db = {};

db.getWatchPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT watch FROM creators WHERE id_creator = ?`, [id_creator], (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result[0]);
    });
  });
};

db.updateWatchPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET watch = watch + 1 WHERE id_creator = ?`,
      [id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.getSeenPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT seen FROM creators WHERE id_creator = ?`, [id_creator], (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result[0]);
    });
  });
};

db.updateSeenPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET seen = seen + 1 WHERE id_creator = ?`,
      [id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.getRemainingPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT remaining FROM creators WHERE id_creator = ?`,
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

db.updateRemainingPointDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE creators SET remaining = watch - seen WHERE id_creator = ?`,
      [id_creator],
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
