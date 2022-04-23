const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('./database')
require('./passport/local-auth')


//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: "coca-cola",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/tasks",require("./routes/task.routes"));
app.use("/users",require("./routes/users.routes"));

//static files
// app.use(express.static()) 

//start server

app.listen(app.get("port"), ()=> {
    console.log('listening on port ' + app.get("port"))
})