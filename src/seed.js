const SaleState = require("./models/saleState");

const states = [
  { code: 1, name: "Pendiente" },
  { code: 2, name: "Aprobado" },
  { code: 3, name: "Entregado" },
  { code: 4, name: "Desaprobado" },
];

async function seedSaleStates() {
  const count = await SaleState.countDocuments();
  if (count === 0) {
    await SaleState.insertMany(states);
    console.log("Sale states seeded");
  }
}

module.exports = seedSaleStates;
