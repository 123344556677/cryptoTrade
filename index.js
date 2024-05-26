const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./Config/database");
const path = require('path');
require("dotenv").config()
require('express-async-errors');

// create express app
const app = express();

app.use(cors("*"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routers
const AuthRoutes = require('./Routes/auth')

app.use('/user', AuthRoutes)



// Error handler and Not Found MiddleWare
const errorhandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.use(notFound)

app.use(errorhandler)


const port = process.env.PORT || 5001;

app.listen(port, async () => {
  await DB(process.env.MONGODB_URI);
  console.log(`Server is listening on port ${port}`);
});

