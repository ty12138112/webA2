var dbcon = require("../crowdfunding_db.js");

var connection = dbcon.getconnection();

connection.connect();

var express = require('express');

var router = express.Router();

router.get("/fundraisers", (req, res)=>{
	connection.query("SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = TRUE", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})

router.get("/categories", (req, res)=>{
	connection.query("SELECT * FROM CATEGORY", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})



// router.get("/:id", (req, res)=>{
// 	connection.query("select * from concert where ConcertID=" + req.params.id, (err, records,fields)=> {
// 		 if (err){
// 			 console.error("Error while retrieve the data");
// 		 }else{
// 			 res.send(records);
// 		 }
// 	})
// })








module.exports = router;
