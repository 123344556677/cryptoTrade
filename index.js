const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./Config/database");
const dotenv=require("dotenv")
dotenv.config()

// create express app
const app = express(); 
var router = express.Router({ strict: true });

//  var corsOptions = { origin: ['http://localhost:3011', 'http://localhost:3000' ] }

//  var corsOptions = { origin: ['https://uhcstock.com', 'https://admin.uhcstock.com', ] }

// var corsOptions = {
//   origin: '*'
// }

app.use(cors("*")); 
// Setup server port
const port = process.env.PORT || 5001;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());

// app.get('/test', (req, res) => {
//   res.send('GET request to the homepage')
// })

// app.use("/", router);
// require("./Routes/routes")(app); 

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
DB(process.env.MONGODB_URI);
