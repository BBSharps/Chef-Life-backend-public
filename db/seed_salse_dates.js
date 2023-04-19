const db = require("./index");
const format = require("pg-format");

const seed_sales_dates = (data) => {
  return db
    .query(`DROP TABLE IF EXISTS sales_dates`)
    .then(() => {
      return db.query(
        `CREATE TABLE sales_dates (item_date DATE, item_name varchar (50), item_quantity int, item_wastage int)`
      );
    })
    .then(() => {
      const tabledata = data.map((item) => [
        item.item_date,
        item.item_name,
        item.item_quantity,
        item.item_wastage,
      ]);

      const query = format(
        `INSERT INTO sales_dates (item_date, item_name, item_quantity, item_wastage) VALUES %L`,
        tabledata
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed_sales_dates;
