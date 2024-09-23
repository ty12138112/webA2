var express = require('express');
const cors = require("cors"); // Import cors

var app = express();
// Enable CORS (must after initialise it)
app.use(cors());

var crowdfundingAPI = require("./controllerAPI/api-controller");

var bodyparser=require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use("/api/crowdfundingAPI", crowdfundingAPI);


app.listen(3060);

console.log("Server up and running on port 3060");
