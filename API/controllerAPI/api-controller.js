//Introduce database connection module
var dbcon = require("../crowdfunding_db.js");
//Get database connection
var connection = dbcon.getconnection();
//Connect to database
connection.connect();
//Introducing the Express framework
var express = require('express');
//Create a routing object
var router = express.Router();
//Get APIs for all crowdfunding projects
router.get("/fundraisers", (req, res) => {
	//Execute SQL query to retrieve all crowdfunding projects and their categories for all activities
	connection.query("SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = TRUE", (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
			res.send(records);//Return query results
		}
	})
})
//Get APIs for all categories
router.get("/categories", (req, res) => {
	//Execute SQL query to retrieve all categories
	connection.query("SELECT * FROM CATEGORY", (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
			res.send(records);//Return query results
		}
	})
})
//API for searching crowdfunding projects
router.get('/search', (req, res) => {
	//Basic SQL Query
	let sql = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = 1';

	let params = [];//Store query parameters
//Dynamically construct SQL based on the query parameters in the request
	if (req.query.organizer) {
		sql += ' AND f.ORGANIZER LIKE ?';
		params.push(`%${req.query.organizer}%`);//Add fuzzy matching
	}
	if (req.query.city) {
		sql += ' AND f.CITY LIKE ?';
		params.push(`%${req.query.city}%`);//Add fuzzy matching
	}
	if (req.query.category) {
		sql += ' AND c.NAME LIKE ?';
		params.push(`%${req.query.category}%`);//Add fuzzy matching
	}
//Execute query
	connection.query(sql, params, (err, records, fields) => {
		if (err) {
			console.error("Error while retrieving the data:");
		} else {
			res.send(records);//Return query results
		}
	});
});
//Get APIs for specific crowdfunding projects
router.get('/fundraiser/:id', (req, res) => {
	const fundraiserId = req.params.id;//Retrieve the crowdfunding project ID from the request parameters
	const sql = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.FUNDRAISER_ID = ? AND f.ACTIVE = 1';
	//Execute query
	connection.query(sql, [fundraiserId], (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
			res.send(records);//Return query results
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







//Export routing module
module.exports = router;
