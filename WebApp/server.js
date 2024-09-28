const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");

const app=express();

//to parse URL-encoded & JSON data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to serve index.html
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/concert",(req,res)=>{
  res.sendFile(path.join(__dirname,"concert.html"));
});

app.get("/add_concert",(req,res)=>{
  res.sendFile(path.join(__dirname,"add_concert.html"));
});

//we will add more routes here

app.listen(8080,()=>{
  console.log("Running in 8080");
});
