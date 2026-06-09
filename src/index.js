require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
require('./passport/local-auth')

const app = express();
require('./database')


//settings
app.set("port", process.env.PORT || 4000);

// Validate required environment variables
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'SESSION_SECRET', 'CORS_ORIGIN'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

app.set('trust proxy', 1);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
  
//routes
app.use("/sales",require("./routes/sale.routes"));
app.use("/users",require("./routes/users.routes"));
app.use("/companies",require("./routes/companies.routes"));

//static files
// app.use(express.static()) 

//start server

app.listen(app.get("port"), ()=> {
    console.log('listening on port ' + app.get("port"))
})