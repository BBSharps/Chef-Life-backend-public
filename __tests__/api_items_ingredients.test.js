const app = require("../app");
const request = require("supertest");
const seed = require("../db/seed_test");
const db = require("../db/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("POST itemsIngredients", () => {
  test("POST/api/itemsIngredients should return an object", () => {
    return request(app)
      .post("/api/itemsIngredients")
      .send({ item_id: 10, ingredient_id: 10 })
      .expect(201)
      .then((data) => {
        const itemsIngredients = data.body.itemsIngredients;
        expect(itemsIngredients).toBeInstanceOf(Object);
      });
  });
  test("POST/api/itemsIngredients should return an object with the correct properties and the correct length", () => {
    return request(app)
      .post("/api/itemsIngredients")
      .expect(201)
      .send({ item_id: 10, ingredient_id: 10 })
      .then((data) => {
        const itemsIngredients = data.body.itemsIngredients;
        expect(itemsIngredients.length).toBe(1);
        itemsIngredients.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: 10,
              ingredient_id: 10,
            })
          );
        });
      });
  });
  test("POST/api/itemsIngredients should return status 400 when missing input data", () => {
    return request(app)
      .post("/api/itemsIngredients")

      .expect(400)
      .send({ item_id: 10 });
  });
  test("POST/api/itemsIngredients should return status 400 when missing input data", () => {
    return request(app)
      .post("/api/itemsIngredients")
      .expect(400)
      .send({ ingredient_id: 10 });
  });
  test("POST/api/itemsIngredients should return status 400 when missing input data", () => {
    return request(app).post("/api/itemsIngredients").expect(400);
  });
  test("POST/api/itemsIngredients should return status 400 when posting an inacurate datatype in the body", () => {
    return request(app)
      .post("/api/itemsIngredients")
      .expect(400)
      .send({ ingredient_id: "10", item_id: "10" });
  });
});
