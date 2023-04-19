const {
  selectMenuItems,
  addMenuItems,
  updateMenuItemsById,
} = require("../models/menu_items");

exports.getMenuItems = (req, res, next) => {
  const item_id = req.params.id;
  const checkForNumber = Number(item_id);
  if (
    typeof checkForNumber === "number" &&
    !checkForNumber &&
    item_id !== undefined
  ) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    selectMenuItems(item_id)
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject({ status: 404, msg: "id not found" });
        } else {
          return res.send({ menuItems: data });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.postMenuItems = (req, res, next) => {
  const body = req.body;
  let hasBodyProperties = true;
  body.item_name && typeof body.item_name === "string"
    ? true
    : (hasBodyProperties = false);
  body.item_type &&
  typeof body.item_type === "string" &&
  [
    "Burgers and melts",
    "Sides",
    "Drinks",
    "Lighter bites",
    "Dirt box's",
  ].includes(body.item_type)
    ? true
    : (hasBodyProperties = false);
  body.item_price !== undefined && typeof body.item_price === "number"
    ? true
    : (hasBodyProperties = false);
  body.item_description && typeof body.item_description === "string"
    ? true
    : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    addMenuItems(body)
      .then((data) => {
        res.status(201).send({ newItem: data });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.patchMenuItemsById = (req, res, next) => {
  const body = req.body;
  const item_id = req.params.id;
  let hasBodyProperties = true;
  if (body.item_name !== undefined)
    (body.item_name !== undefined && typeof body.item_name === "string") ||
    body.item_name === undefined
      ? true
      : (hasBodyProperties = false);
  (body.item_price !== undefined && typeof body.item_price === "number") ||
  body.item_price === undefined
    ? true
    : (hasBodyProperties = false);
  (body.item_description !== undefined &&
    typeof body.item_description === "string") ||
  body.item_description === undefined
    ? true
    : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    updateMenuItemsById(body, item_id)
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject({ status: 404, msg: "id not found" });
        } else {
          res.send({ menuItemsById: data });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};
