var config 	= require('../general/config');
var db     	= require('../general/db');
var jwt		= require('jwt-simple');
var bcrypt 	= require('bcrypt');
var async 	= require('async');

exports.register_new_categorie = function(req, res){

	var userId 				= req.session.userId;

	var name 				= req.body.name;
	var description			= req.body.description;
	var content 				= req.body.content;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				categories.findOne({name : name}, function(err, categorie_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(categorie_validation){

							res.status(403).send({message: "Categoría ya existe"});
								
							
						}else{
							//insert
							categories.insertOne({name : name, description : description, content : content, createdate : new Date()}, function(err, categorie_validation_02){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(categorie_validation_02){
										res.send({ status: 1, message: 'Categoría registrada correctamente' });
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


exports.register_new_subsubcategorie = function(req, res){

	var userId 				= req.session.userId;

	var categorie_id 		= req.body.categorie_id;
	var name 				= req.body.name;
	var description			= req.body.description;
	var content 			= req.body.content;

	var user 				= db.conn.collection('user');
	var subcategories 			= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				subcategories.findOne({name : name}, function(err, subcategorie_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(subcategorie_validation){

							res.status(403).send({message: "Sub Categoría ya existe"});
								
							
						}else{
							//insert
							subcategories.insertOne({categorie_id : db.ObjectID(categorie_id), name : name, description : description, content : content, createdate : new Date()}, function(err, subcategorie_validation_02){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(subcategorie_validation_02){
										res.send({ status: 1, message: 'Sub Categoría registrada correctamente' });
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

exports.load_categories = function(req, res){
	
	var userId 				= req.session.userId;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				categories.find({}).toArray(function(err, categorie_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						res.send({ status: 1, data: categorie_data });
					}
				});
			}
		}
	});

}

exports.load_subcategories = function(req, res){

	var userId 				= req.session.userId;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				subcategories.find({}).toArray(function(err, subcategorie_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						async.each(subcategorie_data, function (cc, callback) {
							categories.findOne({ _id: cc.categorie_id }, function (err, categorie_data) {
								if (err) callback(err);
								else {
									cc.categorie_id = categorie_data;
									callback();
								}
							});
						}, function (err) {
							if (err) {
								console.error(err);
							} else {
								res.send({ status: 1, data: subcategorie_data });
							}
						});

						//res.send({ status: 1, data: subcategorie_data });
					}
				});
			}
		}
	});

}

exports.load_categories_by_id = function(req, res){

	var userId 				= req.session.userId;
	var categorie_id 		= req.body.categorie_id;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				categories.findOne({_id : db.ObjectID(categorie_id)}, function(err, categorie_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						res.send({ status: 1, data: categorie_data });
					}
				});
			}
		}
	});

}

exports.load_subcategories_by_id = function(req, res){

	var userId 				= req.session.userId;
	var subcategorie_id 	= req.body.subcategorie_id;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				subcategories.findOne({_id : db.ObjectID(subcategorie_id)}, function(err, subcategorie_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						/*
						async.each(subcategorie_data.categorie_id, function (cc, callback) {
							console.log('id', cc)
							categories.findOne({ _id: cc }, function (err, categorie_data) {
								if (err) callback(err);
								else {
									console.log('DATA', categorie_data)
									cc = categorie_data;
									callback();
								}
							});
						}, function (err) {
							if (err) {
								console.error(err);
							} else {
								res.send({ status: 1, data: subcategorie_data });
							}
						});
						*/
						res.send({ status: 1, data: subcategorie_data });
					}
				});
			}
		}
	});

}

exports.update_categorie = function(req, res){

	var userId 				= req.session.userId;

	var _id 				= req.body._id;
	var name 				= req.body.name;
	var description			= req.body.description;
	var content 			= req.body.content;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				categories.findOne({name : name}, function(err, categorie_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(categorie_validation){

							var categorie_id 	= categorie_validation._id;
							var categorie_name 	= categorie_validation.name;

							if(categorie_id == _id){

								categories.update({_id : db.ObjectID(_id)}, {$set : {name : name, description : description, content : content, updatedate : new Date()}}, function(err, categorie_validation_02){
									if(err) res.status(500).send({ status: 0, message: err.message });
									else{
										if(categorie_validation_02){
											res.send({ status: 1, message: 'Categoría actualizada correctamente' });
										}
									}
								})

							}else{
								res.status(403).send({message: "Categoría ya existe"});
							}

							
								
							
						}else{
							categories.update({_id : db.ObjectID(_id)}, {$set : {name : name, description : description, content : content, updatedate : new Date()}}, function(err, categorie_validation_02){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(categorie_validation_02){
										res.send({ status: 1, message: 'Categoría actualizada correctamente' });
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

exports.update_subcategorie = function(req, res){

	var userId 				= req.session.userId;

	var _id 				= req.body._id;
	var categorie_id 		= req.body.categorie_id;
	var name 				= req.body.name;
	var description			= req.body.description;
	var content 			= req.body.content;

	var user 				= db.conn.collection('user');
	var subcategories 		= db.conn.collection('subcategories');
	var categories 			= db.conn.collection('categories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				subcategories.findOne({name : name}, function(err, subcategorie_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(subcategorie_validation){

							var subcategorie_id 	= subcategorie_validation._id;
							var subcategorie_name 	= subcategorie_validation.name;

							if(subcategorie_id == _id){

								subcategories.update({_id : db.ObjectID(_id)}, {$set : {categorie_id : db.ObjectID(categorie_id), name : name, description : description, content : content, updatedate : new Date()}}, function(err, subcategorie_validation_02){
									if(err) res.status(500).send({ status: 0, message: err.message });
									else{
										if(subcategorie_validation_02){
											res.send({ status: 1, message: 'Sub Categoría actualizada correctamente' });
										}
									}
								})

							}else{
								res.status(403).send({message: "Sub Categoría ya existe"});
							}

							
								
							
						}else{

							subcategories.update({_id : db.ObjectID(_id)}, {$set : {categorie_id : db.ObjectID(categorie_id), name : name, description : description, content : content, updatedate : new Date()}}, function(err, subcategorie_validation_02){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									if(subcategorie_validation_02){
										res.send({ status: 1, message: 'Sub Categoría actualizada correctamente' });
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

exports.load_subcategories_by_categorieid = function(req, res){

	var userId 				= req.session.userId;
	var categorie_id 		= req.body.categorie_id;

	var user 				= db.conn.collection('user');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				try{
					subcategories.find({categorie_id : db.ObjectID(categorie_id)}).toArray(function(err, subcategorie_data){
						if(err) res.status(500).send({ status: 0, message: err.message });
						else{
							
							res.send({ status: 1, data: subcategorie_data });

						}
					});
				}catch(err){
					res.status(500).send({ status: 0, message: err });
				}
				
			}
		}
	});

}