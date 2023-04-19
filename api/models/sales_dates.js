const db = require("../../db/index");

exports.selectSalesDates = (query) => {
  let queryString = `SELECT * FROM sales_dates`;
  let queryArray = [];
  if (query.item_date) {
    queryString += ` WHERE item_date=$1`;
    queryArray.push(query.item_date);
  }
  return db.query(queryString, queryArray).then((data) => {
    return data.rows;
  });
};

exports.addSalesDates = (body) => {
  const item_date = body.item_date;
  const item_name = body.item_name;
  const item_quantity = body.item_quantity;
  const item_wastage = body.item_wastage;
  let addQueryString = `INSERT INTO sales_dates (item_date, item_name, item_quantity, item_wastage) VALUES ('${item_date}', '${item_name[1]}', '${item_quantity[1]}', '${item_wastage[1]}')`;
  !!item_name[2]
    ? (addQueryString += `, ('${item_date}', '${item_name[2]}', '${item_quantity[2]}', '${item_wastage[2]}')`)
    : null;
  !!item_name[3]
    ? (addQueryString += `, ('${item_date}', '${item_name[3]}', '${item_quantity[3]}', '${item_wastage[3]}')`)
    : null;
  !!item_name[4]
    ? (addQueryString += `, ('${item_date}', '${item_name[4]}', '${item_quantity[4]}', '${item_wastage[4]}')`)
    : null;
  !!item_name[5]
    ? (addQueryString += `, ('${item_date}', '${item_name[5]}', '${item_quantity[5]}', '${item_wastage[5]}')`)
    : null;
  !!item_name[6]
    ? (addQueryString += `, ('${item_date}', '${item_name[6]}', '${item_quantity[6]}', '${item_wastage[6]}')`)
    : null;
  !!item_name[7]
    ? (addQueryString += `, ('${item_date}', '${item_name[7]}', '${item_quantity[7]}', '${item_wastage[7]}')`)
    : null;
  !!item_name[8]
    ? (addQueryString += `, ('${item_date}', '${item_name[8]}', '${item_quantity[8]}', '${item_wastage[8]}')`)
    : null;
  !!item_name[9]
    ? (addQueryString += `, ('${item_date}', '${item_name[9]}', '${item_quantity[9]}', '${item_wastage[9]}')`)
    : null;
  return db.query(addQueryString + ` RETURNING *`).then((data) => {
    return data.rows;
  });
};
