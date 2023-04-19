const {
  selectMenuIngredients,
  selectMenuIngredientsByItemId,
  addMenuIngredients,
  updateMenuIngredients,
} = require("../models/menu_ingredient");

exports.getMenuIngredients = (req, res, next) => {
  const query = req.query;
  selectMenuIngredients()
    .then((data) => {
      res.send({ menuIngredients: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getMenuIngredientsByItemId = (req, res, next) => {
  const query = req.query;
  const item_id = req.params.id;
  selectMenuIngredientsByItemId(item_id)
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject({ status: 404, msg: "id not found" });
      } else {
        res.send({ ingredientsByMenuId: data });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postMenuIngredients = (req, res, next) => {
  const body = req.body;
  let hasBodyProperties = true;
  body.ingredient_name && typeof body.ingredient_name === "string"
    ? true
    : (hasBodyProperties = false);
  body.ingredient_quantity !== undefined &&
  typeof body.ingredient_quantity === "number"
    ? true
    : (hasBodyProperties = false);
  body.ingredient_price !== undefined &&
  typeof body.ingredient_price === "number"
    ? true
    : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    addMenuIngredients(body)
      .then((data) => {
        res.status(201).send({ menuIngredients: data });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};

exports.patchMenuIngredients = (req, res, next) => {
  const body = req.body;
  let hasBodyProperties = true;
  body.ingredient_id !== undefined && typeof body.ingredient_id === "number"
    ? true
    : (hasBodyProperties = false);
  (body.ingredient_quantity !== undefined &&
    typeof body.ingredient_quantity === "number") ||
  body.ingredient_quantity === undefined
    ? true
    : (hasBodyProperties = false);
  (body.ingredient_price !== undefined &&
    typeof body.ingredient_price === "number") ||
  body.ingredient_price === undefined
    ? true
    : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    updateMenuIngredients(body)
      .then((data) => {
        if (data.length === 0) {
          return Promise.reject({ status: 404, msg: "id not found" });
        } else {
          res.send({ menuIngredients: data });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};
