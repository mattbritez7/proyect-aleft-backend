const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');

const { mongoose} = require('./database')

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/tasks",require("./routes/task.routes"));
app.use("/users",require("./routes/users.routes"));

//static files
// app.use(express.static()) 

//start server

app.listen(app.get("port"), ()=> {
    console.log('listening on port ' + app.get("port"))
})