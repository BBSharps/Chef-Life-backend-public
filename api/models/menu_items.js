const db = require("../../db/index");

exports.selectMenuItems = (item_id) => {
  let queryString = `SELECT * FROM menu_items `;
  const idArray = [];
  if (item_id !== undefined) {
    queryString += `WHERE item_id = $1`;
    idArray.push(item_id);
  }
  return db.query(queryString, idArray).then((data) => {
    return data.rows;
  });
};

exports.addMenuItems = (body) => {
  const item_name = body.item_name;
  const item_type = body.item_type;
  const item_price = body.item_price;
  const item_description = body.item_description;

  return db
    .query(
      `INSERT INTO menu_items (item_name, item_type, item_price, item_description) VALUES ('${item_name}', '${item_type}', ${item_price}, '${item_description}') RETURNING *`
    )
    .then((data) => {
      return data.rows;
    });
};

exports.updateMenuItemsById = (body, item_id) => {
  const item_name = body.item_name;
  const item_price = body.item_price;
  const item_description = body.item_description;
  let queryString = `UPDATE menu_items SET`;
  item_name !== undefined
    ? (queryString += ` item_name = '${item_name}'`)
    : null;
  item_name !== undefined && item_price !== undefined
    ? (queryString += `, `)
    : null;
  item_name !== undefined &&
  item_price === undefined &&
  item_description !== undefined
    ? (queryString += `, `)
    : null;
  item_price !== undefined
    ? (queryString += ` item_price = '${item_price}'`)
    : null;
  item_price !== undefined && item_description !== undefined
    ? (queryString += `, `)
    : null;
  item_description !== undefined
    ? (queryString += ` item_description = '${item_description}'`)
    : null;
  return db
    .query((queryString += ` WHERE item_id = $1 RETURNING *`), [item_id])
    .then((data) => {
      return data.rows;
    });
};
