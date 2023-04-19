const app = require("../app");
const request = require("supertest");
const seed = require("../db/seed_test");
const db = require("../db/index");
const { string } = require("pg-format");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET menuIngredients", () => {
  test("GET/api/menuIngredients should return an object", () => {
    return request(app)
      .get("/api/menuIngredients")

      .expect(200)
      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        expect(menuIngredients).toBeInstanceOf(Object);
      });
  });
  test("GET/api/menuIngredients should return an object with the correct properties and the correct length", () => {
    return request(app)
      .get("/api/menuIngredients")
      .expect(200)

      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        expect(menuIngredients.length).toBe(24);
        menuIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              ingredient_id: expect.any(Number),
              ingredient_name: expect.any(String),
              ingredient_quantity: expect.any(Number),
              ingredient_price: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET ingredientsByMenuId", () => {
  test("GET/api/menuItems/:id/ingredients", () => {
    return request(app)
      .get("/api/menuItems/1/ingredients")
      .expect(200)

      .then((data) => {
        const ingredients = data.body.ingredientsByMenuId;
        expect(ingredients).toBeInstanceOf(Object);
      });
  });
  test("GET/api/menuItems/:id/ingredients should return a list of ingredients that are used to make the menu_items with the input item_id", () => {
    return request(app)
      .get("/api/menuItems/1/ingredients")
      .expect(200)

      .then((data) => {
        const ingredients = data.body.ingredientsByMenuId;
        ingredients.map((item) =>
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 1,
              ingredient_name: expect.any(String),
            })
          )
        );
      });
  });
  test("/:id/ a request outside of the usalbe values should return a status 404", () => {
    return request(app).get("/api/menuItems/101/ingredients").expect(404);
  });
  test("/:id/ a request outside of the usalbe data type should return a status 400", () => {
    return request(app).get("/api/menuItems/banana/ingredients").expect(400);
  });
});

describe("POST menuIngredients", () => {
  test("POST/api/menuIngredients should return status 201 and the new item", () => {
    return request(app)
      .post("/api/menuIngredients")
      .expect(201)
      .send({
        ingredient_name: "new",
        ingredient_quantity: 1,
        ingredient_price: 1,
      })
      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        menuIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              ingredient_id: expect.any(Number),
              ingredient_name: "new",
              ingredient_quantity: 1,
              ingredient_price: 1,
            })
          );
        });
      });
  });
  test("POST/api/menuIngredients should return status 400 when posting an inacurate body", () => {
    return request(app).post("/api/menuIngredients").expect(400).send({
      ingredient_quantity: 1,
      ingredient_price: 1,
    });
  });
  test("POST/api/menuIngredients should return status 400 when posting an inacurate body", () => {
    return request(app).post("/api/menuIngredients").expect(400).send({
      ingredient_name: "new",
      ingredient_price: 1,
    });
  });
  test("POST/api/menuIngredients should return status 400 when posting an inacurate body", () => {
    return request(app).post("/api/menuIngredients").expect(400).send({
      ingredient_name: "new",
      ingredient_quantity: 1,
    });
  });
  test("POST/api/menuIngredients should return status 400 when not posting a body", () => {
    return request(app).post("/api/menuIngredients").expect(400).send({});
  });
  test("POST/api/menuIngredients should return status 400 when posting an inacurate datatype in the body", () => {
    return request(app)
      .post("/api/menuIngredients")
      .expect(400)
      .send({
        ingredient_name: ["new"],
        ingredient_quantity: "one",
        ingredient_price: [1],
      });
  });
});

describe("PATCH menuIngredients", () => {
  test("PATCH/api/menuIngredients should return status 200 and the updated item", () => {
    return request(app)
      .patch("/api/menuIngredients")
      .expect(200)
      .send({
        ingredient_id: 1,
        ingredient_quantity: 5,
        ingredient_price: 10,
      })
      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        menuIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              ingredient_id: 1,
              ingredient_name: expect.any(String),
              ingredient_quantity: 5,
              ingredient_price: 10,
            })
          );
        });
      });
  });
  test("PATCH/api/menuIngredients should return status 200 and the updated item when passed 1 update option", () => {
    return request(app)
      .patch("/api/menuIngredients")
      .expect(200)
      .send({
        ingredient_id: 1,
        ingredient_price: 10,
      })
      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        menuIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              ingredient_id: 1,
              ingredient_name: expect.any(String),
              ingredient_quantity: 10,
              ingredient_price: 10,
            })
          );
        });
      });
  });
  test("PATCH/api/menuIngredients should return status 200 and the updated when passed item 1 update option", () => {
    return request(app)
      .patch("/api/menuIngredients")
      .expect(200)
      .send({
        ingredient_id: 1,
        ingredient_quantity: 5,
      })
      .then((data) => {
        const menuIngredients = data.body.menuIngredients;
        menuIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              ingredient_id: 1,
              ingredient_name: expect.any(String),
              ingredient_quantity: 5,
              ingredient_price: 100,
            })
          );
        });
      });
  });
  test("Patch/api/menuIngredients should return status 400 when Patching without a body", () => {
    return request(app).patch("/api/menuIngredients").expect(400).send({});
  });
  test("PATCH/api/menuIngredients should return status 404 when Patching an inacurate ingredient_id in the body", () => {
    return request(app).patch("/api/menuIngredients").expect(404).send({
      ingredient_id: 92,
      ingredient_quantity: 5,
      ingredient_price: 10,
    });
  });
  test("PATCH/api/menuIngredients should return status 400 when Patching an inacurate datatype in the body", () => {
    return request(app)
      .patch("/api/menuIngredients")
      .expect(400)
      .send({
        ingredient_id: "one",
        ingredient_quantity: "5",
        ingredient_price: [10],
      });
  });
});
