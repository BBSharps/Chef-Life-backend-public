const db = require("../../db/index");

exports.selectMenuIngredients = () => {
  return db.query(`SELECT * FROM menu_ingredients`).then((data) => {
    return data.rows;
  });
};

exports.selectMenuIngredientsByItemId = (item_id) => {
  return db
    .query(
      `SELECT item_id,ingredient_name FROM menu_ingredients JOIN items_ingredients ON items_ingredients.ingredient_id = menu_ingredients.ingredient_id WHERE item_id = $1`,
      [item_id]
    )
    .then((data) => {
      return data.rows;
    });
};

exports.addMenuIngredients = (body) => {
  const ingredient_name = body.ingredient_name;
  const ingredient_quantity = body.ingredient_quantity;
  const ingredient_price = body.ingredient_price;
  return db
    .query(
      `INSERT INTO menu_ingredients (ingredient_name, ingredient_quantity, ingredient_price) VALUES ('${ingredient_name}', '${ingredient_quantity}', '${ingredient_price}') RETURNING *`
    )
    .then((data) => {
      return data.rows;
    });
};

exports.updateMenuIngredients = (body) => {
  const ingredient_id = body.ingredient_id;
  const ingredient_price = body.ingredient_price;
  const ingredient_quantity = body.ingredient_quantity;
  let queryString = `UPDATE menu_ingredients SET`;
  ingredient_price !== undefined
    ? (queryString += ` ingredient_price = '${ingredient_price}'`)
    : null;
  ingredient_price !== undefined && ingredient_quantity !== undefined
    ? (queryString += `,`)
    : null;
  ingredient_quantity !== undefined
    ? (queryString += ` ingredient_quantity = '${ingredient_quantity}'`)
    : null;
  return db
    .query((queryString += ` WHERE ingredient_id = $1 RETURNING *`), [
      ingredient_id,
    ])
    .then((data) => {
      return data.rows;
    });
};
