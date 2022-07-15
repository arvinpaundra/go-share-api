const pool = require('../../../../lib/db');

let db = {};

db.getAllContentsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT creators.id_creator, creators.fullname, contents.id_content, contents.title, contents.thumbnail, contents.url FROM creators JOIN contents ON creators.id_creator = contents.id_creator`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      },
    );
  });
};

db.getContentByIdDB = (id_content) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_content, title, url, thumbnail FROM contents WHERE id_content = ?`,
      [id_content],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result[0]);
      },
    );
  });
};

db.editContentByIdDB = (id_content, title, url) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE contents SET title = ?, url = ? WHERE id_content = ?`,
      [title, url, id_content],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.deleteContentByIdDB = (id_content) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM contents WHERE id_content = ?`, [id_content], (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};

module.exports = db;
