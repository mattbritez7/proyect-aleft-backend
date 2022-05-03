const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('./passport/local-auth')

const app = express();
require('./database')


//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
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