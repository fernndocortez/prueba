var db = require('../general/db');
var async = require('async');

var dbData = {
	user: [
		{
			"username" : "admin",
			"password" : "$2a$10$GFQIRHbZzUASBZiOGy6wUOIAb0mPePLYf1RYM5T7cxzxKMSyMn4kS",
			"name" : "Fernando",
			"lastname" : "Cortez",
			"role" : "administrador",
			"mail" : "fernndo.cortez@gmail.com",
			"dni" : "74580649",
			"status" : "enable"
		}
	]
	

};

db.open(function () {
	async.forEachOfSeries(dbData, function (value, key, callback) {
		db.conn.collection(key).deleteMany({}, {w:1}, function () {
			db.conn.collection(key).insertMany(value, function (err, r) {
				console.log(key,'->', r.insertedCount);
				callback();
			});
		});
	}, function () {
		db.conn.close();
	});
});