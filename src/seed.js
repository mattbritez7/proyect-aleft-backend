const TaskState = require("./models/taskState");

const states = [
  { code: 1, name: "Pendiente" },
  { code: 2, name: "Aprobado" },
  { code: 3, name: "Entregado" },
];

async function seedTaskStates() {
  const count = await TaskState.countDocuments();
  if (count === 0) {
    await TaskState.insertMany(states);
    console.log("Sale states seeded");
  }
}

module.exports = seedTaskStates;
