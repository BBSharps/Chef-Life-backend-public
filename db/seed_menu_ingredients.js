const db = require("./index");
const format = require("pg-format");

const seed_menu_ingredients = (data) => {
  return db
    .query(`DROP TABLE IF EXISTS menu_ingredients`)
    .then(() => {
      return db.query(
        `CREATE TABLE menu_ingredients (ingredient_id SERIAL PRIMARY KEY, ingredient_quantity int, ingredient_name varchar (50), ingredient_price int)`
      );
    })
    .then(() => {
      const tabledata = data.map((item) => [
        item.ingredient_name,
        item.ingredient_quantity,
        item.ingredient_price,
      ]);

      const query = format(
        `INSERT INTO menu_ingredients (ingredient_name, ingredient_quantity, ingredient_price) VALUES %L`,
        tabledata
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed_menu_ingredients;
