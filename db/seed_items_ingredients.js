const db = require("./index");
const format = require("pg-format");

const seed_menu_ingredients = (data) => {
  return db
    .query(`DROP TABLE IF EXISTS items_ingredients`)
    .then(() => {
      return db.query(
        `CREATE TABLE items_ingredients ( item_id int, ingredient_id int)`
      );
    })
    .then(() => {
      const tabledata = data.map((item) => [item.item_id, item.ingredient_id]);

      const query = format(
        `INSERT INTO items_ingredients (item_id, ingredient_id) VALUES %L`,
        tabledata
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed_menu_ingredients;
