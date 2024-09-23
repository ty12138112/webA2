var dbcon = require("../database");

var connection = dbcon.getconnection();

connection.connect();

var express = require('express');

var router = express.Router();

router.get("/", (req, res)=>{
	connection.query("select * from concert", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})

router.get("/:id", (req, res)=>{
	connection.query("select * from concert where ConcertID=" + req.params.id, (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})

router.post("/", (req, res)=>{
	console.log(req.body.ConcertID);
	console.log(req.body.ArtistName);	
	console.log(req.body.Location);
	var ConcertID = req.body.ConcertID;
	var ArtistName = req.body.ArtistName;
	var Location = req.body.Location;
	connection.query("INSERT INTO concert VALUES("+ConcertID+",'"+ArtistName+"','"+Location+"')",
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
		 }else{
			 res.send({insert:"success"});
		 }
	})
})

router.put("/", (req, res)=>{
	var ConcertID = req.body.ConcertID;
	var Location = req.body.Location;
	connection.query("UPDATE concert SET Location='"+Location+"' where ConcertID="+ConcertID,
	(err, result)=> {
		 if (err){
			 console.error("Error while Updating the data" + err);
		 }else{
			 res.send({update:"success"});
		 }
	})
})

router.delete("/:id", (req, res)=>{
	connection.query("delete from concert where ConcertID=" + req.params.id, (err, records,fields)=> {
		 if (err){
			 console.error("Error while deleting the data");
		 }else{
			 res.send({delete:"Delete Sucess"});
		 }
	})
})

module.exports = router;
