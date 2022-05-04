
const mongoose = require('mongoose');

const user = process.env.DB_USER            || "mattbritez7"
const password = process.env.DB_PASSWORD    || "THEGAMERORI7"
const dbname = process.env.DB_NAME          || "alef"

const url = `mongodb+srv://${user}:${password}@cluster0.cv2me.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url)
.then(db => console.log('Connect database'))
.catch(err => console.error(err))

module.exports = mongoose;