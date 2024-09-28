var dbcon = require("../crowdfunding_db.js");

var connection = dbcon.getconnection();

connection.connect();

var express = require('express');

var router = express.Router();

router.get("/fundraisers", (req, res) => {
	connection.query("SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = TRUE", (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
			res.send(records);
		}
	})
})

router.get("/categories", (req, res) => {
	connection.query("SELECT * FROM CATEGORY", (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
			res.send(records);
		}
	})
})

router.get('/search', (req, res) => {
	let sql = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = 1';

	let params = [];

	if (req.query.organizer) {
		sql += ' AND f.ORGANIZER LIKE ?';
		params.push(`%${req.query.organizer}%`);
	}
	if (req.query.city) {
		sql += ' AND f.CITY LIKE ?';
		params.push(`%${req.query.city}%`);
	}
	if (req.query.category) {
		sql += ' AND c.NAME LIKE ?';
		params.push(`%${req.query.category}%`);
	}

	connection.query(sql, params, (err, records, fields) => {
		if (err) {
			console.error("Error while retrieving the data:");
		} else {
			res.send(records);
		}
	});
});

router.get('/fundraiser/:id', (req, res) => {
	const fundraiserId = req.params.id;
	const sql = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.FUNDRAISER_ID = ? AND f.ACTIVE = 1';
	connection.query(sql, [fundraiserId], (err, records, fields) => {
		if (err) {
			console.error("Error while retrieve the data");
		} else {
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
