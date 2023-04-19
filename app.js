const express = require("express");
const cors = require("cors");
const {
  handleBadPaths,
  handleCustomErrors,
  handle500,
} = require("./api/controllers/handleErrors");
const { postItemsIngredients } = require("./api/controllers/items_ingredients");
const {
  getMenuIngredients,
  getMenuIngredientsByItemId,
  postMenuIngredients,
  patchMenuIngredients,
} = require("./api/controllers/menu_ingredients");
const {
  getMenuItems,
  postMenuItems,
  patchMenuItemsById,
} = require("./api/controllers/menu_items");
const {
  getSalesDates,
  postSalesDates,
} = require("./api/controllers/sales_dates");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/menuItems", getMenuItems);
app.get("/api/menuItems/:id", getMenuItems);
app.get("/api/menuIngredients", getMenuIngredients);
app.get("/api/salesDates", getSalesDates);
app.get("/api/menuItems/:id/ingredients", getMenuIngredientsByItemId);

app.post("/api/menuItems", postMenuItems);
app.post("/api/itemsIngredients", postItemsIngredients);
app.post("/api/menuIngredients", postMenuIngredients);
app.post("/api/salesDates", postSalesDates);

app.patch("/api/menuItems/:id", patchMenuItemsById);
app.patch("/api/menuIngredients", patchMenuIngredients);

app.use(handleBadPaths);
app.use(handleCustomErrors);
app.use(handle500);
module.exports = app;
