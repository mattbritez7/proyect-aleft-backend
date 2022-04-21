
const mongoose = require('mongoose');

const user = "mattbritez7"
const password = "THEGAMERORI7"
const dbname = "alef"
const url = `mongodb+srv://${user}:${password}@cluster0.cv2me.mongodb.net/${dbname}?retryWrites=true&w=majority`


mongoose.connect(url)
.then(db => console.log('Connect database'))
.catch(err => console.error(err))





module.exports = mongoose;