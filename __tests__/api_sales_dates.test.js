const app = require("../app");
const request = require("supertest");
const seed = require("../db/seed_test");
const db = require("../db/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET salesDates", () => {
  test("GET/api/salesDates should return an object", () => {
    return request(app)
      .get("/api/salesDates")
      .expect(200)
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates).toBeInstanceOf(Object);
      });
  });
  test("GET/api/salesDates should return an object with the correct properties and the correct length", () => {
    return request(app)
      .get("/api/salesDates")
      .expect(200)
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates.length).toBe(15);
        salesDates.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_date: expect.any(String),
              item_name: expect.any(String),
              item_quantity: expect.any(Number),
              item_wastage: expect.any(Number),
            })
          );
        });
      });
  });
  test("GET/api/salesDates should be serchable by date when given it as a query", () => {
    return request(app)
      .get("/api/salesDates?item_date=2023-02-13")
      .expect(200)
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates.length).toBe(4);
        salesDates.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_date: "2023-02-13T00:00:00.000Z",
              item_name: expect.any(String),
              item_quantity: expect.any(Number),
              item_wastage: expect.any(Number),
            })
          );
        });
      });
  });
  test("GET/api/salesDates should be serchable by date when given it as a query and if given a date with no entries should return a blank array", () => {
    return request(app)
      .get("/api/salesDates?item_date=2023-03-13")
      .expect(200)
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates.length).toBe(0);
      });
  });
});

describe("POST salesDates", () => {
  test("POST/api/salesDates should return status 201 and the new item", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(201)
      .send({
        item_date: "2023-02-21",
        item_name: { 1: "new" },
        item_quantity: { 1: 1 },
        item_wastage: { 1: 0 },
      })
      .then((data) => {
        const salesDates = data.body.salesDates;
        salesDates.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_date: "2023-02-21T00:00:00.000Z",
              item_name: "new",
              item_quantity: 1,
              item_wastage: 0,
            })
          );
        });
      });
  });
  test("POST/api/salesDates should return status 201 and the new items when given more than 1 in the correct categories", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(201)
      .send({
        item_date: "2023-02-21",
        item_name: { 1: "new", 2: "new" },
        item_quantity: { 1: 1, 2: 1 },
        item_wastage: { 1: 0, 2: 0 },
      })
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates.length).toBe(2);
        salesDates.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_date: "2023-02-21T00:00:00.000Z",
              item_name: "new",
              item_quantity: 1,
              item_wastage: 0,
            })
          );
        });
      });
  });
  test("POST/api/salesDates should be able to make up to 9 entries", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(201)
      .send({
        item_date: "2023-02-21",
        item_name: {
          1: "new",
          2: "new",
          3: "new",
          4: "new",
          5: "new",
          6: "new",
          7: "new",
          8: "new",
          9: "new",
        },
        item_quantity: {
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1,
          7: 1,
          8: 1,
          9: 1,
        },
        item_wastage: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      })
      .then((data) => {
        const salesDates = data.body.salesDates;
        expect(salesDates.length).toBe(9);
        salesDates.map((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_date: "2023-02-21T00:00:00.000Z",
              item_name: expect.any(String),
              item_quantity: expect.any(Number),
              item_wastage: expect.any(Number),
            })
          );
        });
      });
  });
  test("POST/api/salesDates should return status 400 when posting an inacurate body", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(400)
      .send({
        item_name: { 1: "new" },
        item_quantity: { 1: 1 },
        item_wastage: { 1: 0 },
      });
  });
  test("POST/api/salesDates should return status 400 when posting an inacurate body", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(400)
      .send({
        item_date: "2023-02-21",
        item_quantity: { 1: 1 },
        item_wastage: { 1: 0 },
      });
  });
  test("POST/api/salesDates should return status 400 when posting an inacurate body", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(400)
      .send({
        item_date: "2023-02-21",
        item_name: { 1: "new" },
        item_wastage: { 1: 0 },
      });
  });
  test("POST/api/salesDates should return status 400 when posting an inacurate body", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(400)
      .send({
        item_date: "2023-02-21",
        item_name: { 1: "new" },
        item_quantity: { 1: 1 },
      });
  });
  test("POST/api/salesDates should return status 400 when not posting a body", () => {
    return request(app).post("/api/salesDates").expect(400);
  });
  test("POST/api/salesDates should return status 400 when posting an inacurate data type in the body", () => {
    return request(app)
      .post("/api/salesDates")
      .expect(400)
      .send({
        item_date: ["21/02/2023"],
        item_name: 10,
        item_quantity: "ten",
        item_wastage: "0",
      });
  });
});
