
const mongoose = require('mongoose');

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dbname = process.env.DB_NAME

const url = `mongodb+srv://${user}:${password}@cluster0.cv2me.mongodb.net/${dbname}?retryWrites=true&w=majority&authSource=admin`

mongoose.connect(url)
.then(db => console.log('Connect database'))
.catch(err => console.error(err))

module.exports = mongoose;