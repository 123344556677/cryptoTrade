const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./Config/database");
const path = require('path');
require("dotenv").config()
require('express-async-errors');

// create express app
const app = express();

const corsOptions = {
  origin: ["https://uhcstock.com", "http://192.168.100.5:3000", "https://admin.uhcstock.com","http://localhost:3000","http://localhost:3001"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Increase request size limit to 5MB
app.use(bodyParser.json({ limit: '10mb' }));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routers
const AuthRoutes = require('./Routes/auth')
const TransactionRoutes = require('./Routes/transaction')
const AdminRoutes = require('./Routes/admin')
const TeamRoutes = require('./Routes/teams')


app.use('/user', AuthRoutes)
app.use('/transaction', TransactionRoutes)
app.use('/admin', AdminRoutes)
app.use('/team', TeamRoutes)


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

