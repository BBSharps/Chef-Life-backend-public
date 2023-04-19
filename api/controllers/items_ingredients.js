const { addItemsIngredients } = require("../models/items_ingredients");

exports.postItemsIngredients = (req, res, next) => {
  const body = req.body;
  let hasBodyProperties = true;
  body.item_id !== undefined && typeof body.item_id === "number"
    ? true
    : (hasBodyProperties = false);
  body.ingredient_id !== undefined && typeof body.ingredient_id === "number"
    ? true
    : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    addItemsIngredients(body)
      .then((data) => {
        return res.status(201).send({ itemsIngredients: data });
      })
      .catch((err) => {
        next(err);
      });
  }
};
