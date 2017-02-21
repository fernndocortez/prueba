var mongodb = require('mongodb');
var config  = require('./config');

var client  = mongodb.MongoClient;
var url     = config.db;

exports.open = function (callback) {
	client.connect(url, function(err, connection) {
		if (err) callback(err);
		else {
			exports.conn = connection;
			callback();
		}
	});
};

exports.ObjectID = mongodb.ObjectID;