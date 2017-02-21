var config 		= require('../general/config');
var db     		= require('../general/db');
var jwt			= require('jwt-simple');
var bcrypt 		= require('bcrypt');
var async 		= require('async');
var Paginator 	= require("paginator");

exports.register_new_product = function(req, res){
	
	var userId 				= req.session.userId;

	var name 			= req.body.name;
	var code 			= req.body.code;
	var price 			= req.body.price;
	var stock 			= req.body.stock;
	var categorie_id 	= req.body.categorie_id;
	var subcategorie_id = req.body.subcategorie_id;
	var variables 		= req.body.variables;
	var content 		= req.body.content;
	var image 			= req.body.image;

	var query = {
				name : name,
				code : code,
				price : price,
				stock : stock,
				categorie_id : categorie_id,
				subcategorie_id : subcategorie_id,
				variables : variables,
				content : content,
				image : image
			}

	var user 				= db.conn.collection('user');
	var products 			= db.conn.collection('products');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				products.insertOne(query, function(err, product_validation){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(product_validation){

							res.send({ status: 1, message: 'Producto registrado correctamente' });
									
						}
					}
				})
			}
		}
	});

}

exports.load_products_by_categorie_id = function(req, res){

	var categorie_id 	= req.body.categorie_id;

	var groupby 		= Number(req.body.groupby) || 12;
	var paginator 		= new Paginator(groupby, 5);
	var numeropagina 	= req.body.page || 1;

	var userId 				= req.session.userId;

	var user 				= db.conn.collection('user');
	var products 			= db.conn.collection('products');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				products.count({categorie_id : categorie_id}, function(err, total){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{

						var pagination_info = paginator.build(total, numeropagina);

						products.find({categorie_id: categorie_id}).limit(groupby).skip(pagination_info.first_result).toArray(function(err, product_data){
							if(err) res.status(500).send({ status: 0, message: err.message });
							else{
								
								async.each(product_data, function (cc, callback) {
									categories.findOne({ _id: db.ObjectID(cc.categorie_id) }, function (err, categorie_data) {
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

										async.each(product_data, function (cc, callback) {

											if(cc.subcategorie_id){
												subcategories.findOne({ _id: db.ObjectID(cc.subcategorie_id) }, function (err, subcategorie_data) {
													if (err) callback(err);
													else {
														cc.subcategorie_id = subcategorie_data;
														callback();
													}
												});
											}else{
												callback();
											}
											
										}, function (err) {
											if (err) {
												console.error(err);
											} else {
												res.send({ status: 1, data: product_data , objpagination : pagination_info });
											}
										});


										//res.send({ status: 1, data: product_data });
									}
								});

								//res.send({ status: 1, data: product_data });
											
								
							}
						})


					}
				})

				
			}
		}
	});

}

exports.load_products_by_subcategorie_id = function(req, res){

	var subcategorie_id 	= req.body.subcategorie_id;

	var groupby 		= Number(req.body.groupby) || 12;
	var paginator 		= new Paginator(groupby, 5);
	var numeropagina 	= req.body.page || 1;

	var userId 				= req.session.userId;

	var user 				= db.conn.collection('user');
	var products 			= db.conn.collection('products');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				products.count({subcategorie_id : subcategorie_id}, function(err, total){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{

						var pagination_info = paginator.build(total, numeropagina);

						products.find({subcategorie_id: subcategorie_id}).limit(groupby).skip(pagination_info.first_result).toArray(function(err, product_data){
							if(err) res.status(500).send({ status: 0, message: err.message });
							else{
								
								async.each(product_data, function (cc, callback) {
									categories.findOne({ _id: db.ObjectID(cc.categorie_id) }, function (err, categorie_data) {
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

										async.each(product_data, function (cc, callback) {

											if(cc.subcategorie_id){
												subcategories.findOne({ _id: db.ObjectID(cc.subcategorie_id) }, function (err, subcategorie_data) {
													if (err) callback(err);
													else {
														cc.subcategorie_id = subcategorie_data;
														callback();
													}
												});
											}else{
												callback();
											}
											
										}, function (err) {
											if (err) {
												console.error(err);
											} else {
												res.send({ status: 1, data: product_data , objpagination : pagination_info });
											}
										});


										//res.send({ status: 1, data: product_data });
									}
								});

								//res.send({ status: 1, data: product_data });
											
								
							}
						})


					}
				})

				
			}
		}
	});

}

exports.load_products = function(req, res){

	var groupby 		= Number(req.body.groupby) || 12;
	var paginator 		= new Paginator(groupby, 5);
	var numeropagina 	= req.body.page || 1;

	var userId 				= req.session.userId;

	var user 				= db.conn.collection('user');
	var products 			= db.conn.collection('products');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				products.count({}, function(err, total){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{

						var pagination_info = paginator.build(total, numeropagina);

						products.find({}).limit(groupby).skip(pagination_info.first_result).toArray(function(err, product_data){
							if(err) res.status(500).send({ status: 0, message: err.message });
							else{
								
								async.each(product_data, function (cc, callback) {
									categories.findOne({ _id: db.ObjectID(cc.categorie_id) }, function (err, categorie_data) {
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

										async.each(product_data, function (cc, callback) {

											if(cc.subcategorie_id){
												subcategories.findOne({ _id: db.ObjectID(cc.subcategorie_id) }, function (err, subcategorie_data) {
													if (err) callback(err);
													else {
														cc.subcategorie_id = subcategorie_data;
														callback();
													}
												});
											}else{
												callback();
											}
											
										}, function (err) {
											if (err) {
												console.error(err);
											} else {
												res.send({ status: 1, data: product_data , objpagination : pagination_info });
											}
										});


										//res.send({ status: 1, data: product_data });
									}
								});

								//res.send({ status: 1, data: product_data });
											
								
							}
						})


					}
				})

				
			}
		}
	});

}

exports.load_product_by_id = function(req, res){

	var userId 				= req.session.userId;
	var product_id 			= req.body.product_id;

	var user 				= db.conn.collection('user');
	var products 			= db.conn.collection('products');
	var categories 			= db.conn.collection('categories');
	var subcategories 		= db.conn.collection('subcategories');

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				products.findOne({_id : db.ObjectID(product_id)}, function(err, product_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						
						

						res.send({ status: 1, data: product_data });
									
						
					}
				})
			}
		}
	});


}

