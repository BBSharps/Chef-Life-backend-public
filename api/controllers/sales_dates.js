const { selectSalesDates, addSalesDates } = require("../models/sales_dates");

exports.getSalesDates = (req, res, next) => {
  const query = req.query;
  selectSalesDates(query)
    .then((data) => {
      res.send({ salesDates: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSalesDates = (req, res, next) => {
  const body = req.body;
  let hasBodyProperties = true;
  body.item_date && typeof body.item_date === "string"
    ? true
    : (hasBodyProperties = false);
  body.item_name ? null : (hasBodyProperties = false);
  body.item_quantity !== undefined ? null : (hasBodyProperties = false);
  body.item_wastage !== undefined ? null : (hasBodyProperties = false);
  if (!hasBodyProperties) {
    return res.status(400).send({ msg: "bad request" });
  } else {
    addSalesDates(body)
      .then((data) => {
        return res.status(201).send({ salesDates: data });
      })
      .catch((err) => {
        next(err);
      });
  }
};
