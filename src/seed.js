const SaleState = require("./models/saleState");

const states = [
  { code: 1, name: "Pending" },
  { code: 2, name: "Approved" },
  { code: 3, name: "Delivered" },
];

async function loadSaleStates() {
  const count = await SaleState.countDocuments();
  if (count === 0) {
    await SaleState.insertMany(states);
    console.log("Sale states loaded");
  }
}

module.exports = loadSaleStates;
