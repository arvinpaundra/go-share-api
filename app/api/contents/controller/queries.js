const pool = require('../../../../lib/db');

let db = {};

db.getAllContentsDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT contents.id_content, contents.title, contents.url, contents.thumbnail, creators.id_creator, creators.fullname FROM contents JOIN creators ON contents.id_creator = creators.id_creator WHERE creators.status = 'Y' AND NOT creators.remaining = 0`,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      },
    );
  });
};

db.getDetailContentDB = (id_content) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT title, url, thumbnail FROM contents WHERE id_content = ?`,
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

db.getContentsCreatorDB = (id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_content, id_creator, title, url, thumbnail FROM contents WHERE id_creator = ?`,
      [id_creator],
      (error, contents) => {
        if (error) {
          return reject(error);
        }

        return resolve(contents);
      },
    );
  });
};

db.getContentByIdDB = (id_content) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_content, title, url, thumbnail FROM contents WHERE id_content = ?`,
      [id_content],
      (error, content) => {
        if (error) {
          return reject(error);
        }

        return resolve(content[0]);
      },
    );
  });
};

db.postContentCreatorDB = (title, url, thumbnail, id_creator) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO contents (title, url, thumbnail, id_creator) VALUES (?, ?, ?, ?)`,
      [title, url, thumbnail, id_creator],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.editContentCreatorDB = (title, url, thumbnail, id_content) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE contents SET title = ?, url = ?, thumbnail = ? WHERE id_content = ?`,
      [title, url, thumbnail, id_content],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      },
    );
  });
};

db.deleteContentCreatorDB = (id_content) => {
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
