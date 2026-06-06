require('dotenv').config()
const mongoose = require('mongoose');

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dbname = process.env.DB_NAME

const url = `mongodb+srv://${user}:${password}@cluster0.cv2me.mongodb.net/${dbname}?retryWrites=true&w=majority&authSource=admin`

async function migrate() {
  await mongoose.connect(url);
  console.log('Conectado a MongoDB');

  const db = mongoose.connection.db;
  const collection = db.collection('users');

  const oldUsers = await collection.find({ IsAdmin: { $exists: true } }).toArray();
  console.log(`Usuarios con IsAdmin (schema antiguo): ${oldUsers.length}`);

  for (const u of oldUsers) {
    const newRole = u.IsAdmin ? 'administrador' : 'vendedor';
    await collection.updateOne(
      { _id: u._id },
      { $set: { role: newRole, Company: '' }, $unset: { IsAdmin: '' } }
    );
    console.log(`  ${u.username}: IsAdmin=${u.IsAdmin} → role=${newRole}`);
  }

  console.log('Migración completada');
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Error en migración:', err);
  process.exit(1);
});
