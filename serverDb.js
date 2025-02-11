const mysql = require('mysql2');
const fs = require('fs');
const conf = JSON.parse(fs.readFileSync('conf.json'));
conf.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');
const connection = mysql.createConnection(conf);

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const db = {
  createTable: async () => {
    return await executeQuery(`
      CREATE TABLE IF NOT EXISTS images (
        id INT PRIMARY KEY AUTO_INCREMENT,  
        url VARCHAR(255) NOT NULL
      );
    `);
  },

  insert: async (img) => {
    const sql = `INSERT INTO images (url) VALUES (?)`;
    return await executeQuery(sql, [img.url]);
  },
  
  select: async () => {
    return await executeQuery(`SELECT id, url FROM images`);
  },

  update: async (img) => {
    const sql = `UPDATE images SET url = ? WHERE id = ?`;
    return await executeQuery(sql, [img.url, img.id]);
  },

  remove: async (img) => {
    const sql = `DELETE FROM images WHERE id = ?`;
    return await executeQuery(sql, [img.id]);
  }
};

module.exports = db;


