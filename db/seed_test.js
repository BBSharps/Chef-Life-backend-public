const seed_menu_items = require("./seed_menu_items");
const menu_items_data = require("./test-data/menu_items_data.json");
const seed_menu_ingredients = require("./seed_menu_ingredients");
const menu_ingredients_data = require("./test-data/menu_ingredients_data.json");
const seed_items_ingredients = require("./seed_items_ingredients");
const items_ingredients_data = require("./test-data/items_ingredients_data.json");
const seed_sales_dates = require("./seed_salse_dates");
const sales_dates_data = require("./test-data/sales_dates_data.json");

const seed = async () => {
  await seed_menu_items(menu_items_data);
  await seed_menu_ingredients(menu_ingredients_data);
  await seed_items_ingredients(items_ingredients_data);
  await seed_sales_dates(sales_dates_data);
};

module.exports = seed;
