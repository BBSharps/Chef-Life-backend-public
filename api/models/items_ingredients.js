const db = require("../../db/index");

exports.addItemsIngredients = (body) => {
  const item_id = body.item_id;
  const ingredient_id = body.ingredient_id;
  return db
    .query(
      `INSERT INTO items_ingredients (item_id, ingredient_id) VALUES ('${item_id}', '${ingredient_id}') RETURNING *`
    )
    .then((data) => {
      return data.rows;
    });
};
