var config 	= require('../general/config');
var db     	= require('../general/db');
var jwt		= require('jwt-simple');
var bcrypt 	= require('bcrypt');


exports.update_content_body = function(req, res){

	var userId 				= req.session.userId;
	var content_description = req.body.content_description;
	var subtitle			= req.body.subtitle;
	var content_body 		= req.body.content_body;

	var user 				= db.conn.collection('user');
	var pagecontents 		= db.conn.collection('pagecontents');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				pagecontents.findOne({content_description : content_description}, function(err, pagecontent_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(pagecontent_validation){
							//update
							pagecontents.update({content_description : content_description}, {$set : {content_body : content_body, subtitle : subtitle, lastmodification : new Date()} }, function(err, pcontent_validation){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(pcontent_validation){
										res.send({ status: 1, message: 'Contenido actualizado correctamente' });
									}
								}
							})
						}else{
							//insert
							pagecontents.insertOne({content_description : content_description, content_body : content_body, subtitle : subtitle, lastmodification : new Date()}, function(err, pcontent_validation){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(pcontent_validation){
										res.send({ status: 1, message: 'Contenido actualizado correctamente' });
									}
								}
							})
						}
					}
				})
			}
		}
	});

}

exports.get_content_body_info = function(req, res){

	var userId 				= req.session.userId;
	var content_description = req.body.content_description;

	var user 				= db.conn.collection('user');
	var pagecontents 		= db.conn.collection('pagecontents');

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				pagecontents.findOne({content_description : content_description}, function(err, pagecontent_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						
							res.send({ status: 1, data: pagecontent_data });
								
						
						
					}
				})
			}
		}
	});


}