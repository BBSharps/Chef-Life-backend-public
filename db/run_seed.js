const db = require(".");
const seed = require("./seed_test");

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
