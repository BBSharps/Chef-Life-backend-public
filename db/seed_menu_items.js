const db = require("./index");
const format = require("pg-format");

const seed_menu_items = (data) => {
  return db
    .query(`DROP TABLE IF EXISTS menu_items`)
    .then(() => {
      return db.query(
        `CREATE TABLE menu_items (item_id SERIAL PRIMARY KEY, item_name varchar (50), item_type varchar (50), item_price int, item_description varchar (300))`
      );
    })
    .then(() => {
      const tabledata = data.map((item) => [
        item.item_name,
        item.item_type,
        item.item_price,
        item.item_description,
      ]);

      const query = format(
        `INSERT INTO menu_items (item_name, item_type, item_price, item_description) VALUES %L`,
        tabledata
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed_menu_items;
