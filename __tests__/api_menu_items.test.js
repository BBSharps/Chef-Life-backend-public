const app = require("../app");
const request = require("supertest");
const seed = require("../db/seed_test");
const db = require("../db/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET menuItems", () => {
  test("GET/api/menuItems should return an object", () => {
    return request(app)
      .get("/api/menuItems")
      .expect(200)

      .then((data) => {
        const menuItems = data.body.menuItems;
        expect(menuItems).toBeInstanceOf(Object);
      });
  });
  test("GET/api/menuItems should return an object with the correct properties and the correct length", () => {
    return request(app)
      .get("/api/menuItems")
      .expect(200)

      .then((data) => {
        const menuItems = data.body.menuItems;
        expect(menuItems.length).toBe(10);
        menuItems.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: expect.any(Number),
              item_name: expect.any(String),
              item_type: expect.any(String),
              item_price: expect.any(Number),
              item_description: expect.any(String),
            })
          );
        });
      });
  });
  test("GET/api/menuItems/:id should return an array with the item based on the request id", () => {
    return request(app)
      .get("/api/menuItems/5")
      .expect(200)

      .then((data) => {
        const menuItems = data.body.menuItems;
        expect(menuItems.length).toBe(1);
        menuItems.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 5,
              item_name: expect.any(String),
              item_type: expect.any(String),
              item_price: expect.any(Number),
              item_description: expect.any(String),
            })
          );
        });
      });
  });
  test("a request outside of the usalbe values should return a status 404", () => {
    return request(app).get("/api/menuItems/101").expect(404);
  });
  test("a request outside of the usalbe data type should return a status 400", () => {
    return request(app).get("/api/menuItems/banana").expect(400);
  });
});

describe("POST menuItems", () => {
  test("POST/api/menuItems should return the new posted item", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: "new Item",
        item_price: 1000,
        item_type: "Drinks",
        item_description: "new Item",
      })
      .expect(201)
      .then((data) => {
        const newItem = data.body.newItem;
        newItem.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: expect.any(Number),
              item_name: "new Item",
              item_type: "Drinks",
              item_price: 1000,
              item_description: expect.any(String),
            })
          );
        });
      });
  });
  test("POST/api/menuItems  should return a status 400 when posting an inaccurate body", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_price: 1000,
        item_type: "Drinks",
        item_description: "new Item",
      })
      .expect(400);
  });
  test("POST/api/menuItems  should return a status 400 when posting an inaccurate body", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: "new Item",
        item_type: "Drinks",
        item_description: "new Item",
      })
      .expect(400);
  });
  test("POST/api/menuItems  should return a status 400 when posting an inaccurate body", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: "new Item",
        item_type: "Drinks",
        item_price: 1000,
      })
      .expect(400);
  });
  test("POST/api/menuItems  should return a status 400 when posting an inaccurate body", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: "new Item",
        item_price: 1000,
        item_description: "new Item",
      })
      .expect(400);
  });
  test("POST/api/menuItems  should return a status 400 when posting an item_type that is not recognised", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: "new Item",
        item_price: 1000,
        item_type: "Sizzler",
        item_description: "new Item",
      })
      .expect(400);
  });
  test("POST/api/menuItems should return a status 400 when missing the body", () => {
    return request(app).post("/api/menuItems").expect(400);
  });
  test("POST/api/menuItems  should return a status 400 when given the incorrect data types in the body", () => {
    return request(app)
      .post("/api/menuItems")
      .send({
        item_name: ["new Item"],
        item_price: "1000",
        item_type: { 1: "Drinks" },
        item_description: ["new Item"],
      })
      .expect(400);
  });
});

describe("PATCH menuItemsById", () => {
  test("PATCH/api/menuItems/:id should return status 200 and the updated item", () => {
    return request(app)
      .patch("/api/menuItems/3")
      .expect(200)
      .send({
        item_name: "updated",
        item_price: 1500,
        item_description: "updated",
      })
      .then((data) => {
        const menuItems = data.body.menuItemsById;
        menuItems.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 3,
              item_name: "updated",
              item_price: 1500,
              item_description: "updated",
            })
          );
        });
      });
  });
  test("PATCH/api/menuItems/:id should return status 200 when requesting 1 item to update", () => {
    return request(app)
      .patch("/api/menuItems/3")
      .expect(200)
      .send({
        item_description: "updated",
      })
      .then((data) => {
        const menuItems = data.body.menuItemsById;
        menuItems.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 3,
              item_name: "Fries The Limit - (vg)(gf)",
              item_price: 350,
              item_description: "updated",
            })
          );
        });
      });
  });
  test("PATCH/api/menuItems/:id should return status 200 when requesting 2 item to update", () => {
    return request(app)
      .patch("/api/menuItems/3")
      .expect(200)
      .send({
        item_description: "updated",
        item_price: 1500,
      })
      .then((data) => {
        const menuItems = data.body.menuItemsById;
        menuItems.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 3,
              item_name: "Fries The Limit - (vg)(gf)",
              item_price: 1500,
              item_description: "updated",
            })
          );
        });
      });
  });
  test("PATCH/api/menuItems/:id should return status 400 if using thye wrong data type in the body", () => {
    return request(app)
      .patch("/api/menuItems/3")
      .expect(400)
      .send({
        item_name: ["updated"],
        item_price: "fifteen",
        item_description: 1000,
      });
  });
  test("/:id a request outside of the usalbe values should return a status 404", () => {
    return request(app).patch("/api/menuItems/101").expect(404).send({
      item_price: 1500,
    });
  });
  test("/:id a request outside of the usalbe data type should return a status 400", () => {
    return request(app).patch("/api/menuItems/banana").expect(400).send({
      item_price: 1500,
    });
  });
});

describe("error handeling", () => {
  test("when given an incorrect path should return status 500", () => {
    return request(app).get("/api/undefined").expect(500);
  });
});
