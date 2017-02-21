var db     	= require('../general/db');
var config 	= require('../general/config');
var bcrypt 	= require('bcrypt');
var jwt		= require('jwt-simple');

exports.info = function (req, res) {

	var userId 	= req.session.userId;

	var user 	= db.conn.collection('user');

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				res.send({ status: 1, message: 'Datos obtenidos', data: { user: user_data } });
			} else {
				res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
			}
		}
	});
};

exports.update_user_profile = function(req, res){

	var userId 				= req.session.userId;
	var username 			= req.body.username;
	var country 			= req.body.country;
	var city 				= req.body.city;
	var name 				= req.body.name;
	var lastname 			= req.body.lastname;
	var address 			= req.body.address;
	var address_optional 	= req.body.address_optional;
	var mail 				= req.body.mail;
	var phone				= req.body.phone;

	var user 				= db.conn.collection('user');

	var query 	= 	{
						username : username,
						country : country,
						city : city,
						name : name,
						lastname : lastname,
						address : address,
						address_optional : address_optional,
						mail : mail,
						phone : phone
					};
	

	

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				var user_mail = user_data.mail;

				user.count({mail : mail}, function(err, user_mailers){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{

						if(user_mailers == 0){
							user.update({_id: db.ObjectID(userId)}, {$set : query}, function(err, user_validation){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									res.send({ status: 1, message: 'Datos actualizados correctamente' });
								}
							})
						}else{
							user.findOne({mail : mail}, function(err, user_mail_02){
								if(err) res.status(500).send({ status: 0, message: err.message });
								else{
									var mail_registered = user_mail_02.mail;

									if(user_mail == mail_registered){
										user.update({_id: db.ObjectID(userId)}, {$set : query}, function(err, user_validation){
											if(err) res.status(500).send({ status: 0, message: err.message });
											else{
												res.send({ status: 1, message: 'Datos actualizados correctamente' });
											}
										})
									}else{
										res.status(500).send({ status: 0, message: 'La dirección de correo ya se encuentra registrada' });
									}
								} 
							})
							
						}

					}
				})
				
			} else {
				res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
			}
		}
	});


}	


exports.add_address = function(req, res){

	var userId 		= req.session.userId;
	var name 		= req.body.name;
	var lastname 	= req.body.lastname;
	var phone_day 	= req.body.phone_day;
	var phone_night = req.body.phone_night;
	var mobile 		= req.body.mobile;
	var country 	= req.body.country;
	var address_01 	= req.body.address_01;
	var address_02 	= req.body.address_02;
	var city 		= req.body.city;
	var province 	= req.body.province;
	var postalcode 	= req.body.postalcode;

	var user 				= db.conn.collection('user');
	var usershippingaddress = db.conn.collection('usershippingaddress');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {

				var user_id = user_data._id;

				var query = {
								name 		: name,
								lastname 	: lastname,
								phone_day 	: phone_day,
								phone_night : phone_night,
								mobile 		: mobile,
								country 	: country,
								address_01 	: address_01,
								address_02 	: address_02,
								city 		: city,
								province 	: province,
								postalcode 	: postalcode,
								user_id 	: user_id,
								createdate 	: new Date()
							};

				usershippingaddress.insertOne(query, function(err, ushippingaddress){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						if(ushippingaddress){
							res.send({ status: 1, message: 'Dirección registrada correctamente' });
						}
					}
				})
			}
		}
	});

}

exports.load_shippingaddress_by_user = function(req, res){

	var userId 		= req.session.userId;

	var user 				= db.conn.collection('user');
	var usershippingaddress = db.conn.collection('usershippingaddress');

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				usershippingaddress.find({user_id : db.ObjectID(userId)}).toArray(function(err, shippingaddress_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						res.send({ status: 1, data: shippingaddress_data});
					}
				})
			}
		}
	});
	
}

exports.load_shippingaddress_info = function(req, res){

	var userId 				= req.session.userId;
	var shipping_address_id = req.body.shipping_address_id;

	var user 				= db.conn.collection('user');
	var usershippingaddress = db.conn.collection('usershippingaddress');

	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				usershippingaddress.findOne({user_id : db.ObjectID(userId), _id : db.ObjectID(shipping_address_id) }, function(err, shippingaddress_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						res.send({ status: 1, data: shippingaddress_data});
					}
				})
			}
		}
	});

}

exports.update_address = function(req, res){

	var userId 		= req.session.userId;
	var _id 		= req.body._id;
	var address_01 	= req.body.address_01;
	var address_02 	= req.body.address_02;
	var city 		= req.body.city;
	var country 	= req.body.country;
	var lastname 	= req.body.lastname;
	var mobile 		= req.body.mobile;
	var name 		= req.body.name;
	var phone_day 	= req.body.phone_day;
	var phone_night = req.body.phone_night;
	var postalcode 	= req.body.postalcode;
	var province 	= req.body.province;

	var query = {
			name 		: name,
			lastname 	: lastname,
			phone_day 	: phone_day,
			phone_night : phone_night,
			mobile 		: mobile,
			country 	: country,
			address_01 	: address_01,
			address_02 	: address_02,
			city 		: city,
			province 	: province,
			postalcode 	: postalcode,
			updatedate 	: new Date()
		};

	var user 				= db.conn.collection('user');
	var usershippingaddress = db.conn.collection('usershippingaddress');


	user.findOne({ _id: db.ObjectID(userId) }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				usershippingaddress.update({_id : db.ObjectID(_id), user_id : db.ObjectID(userId) }, {$set : query}, function(err, shippingaddress_data){
					if(err) res.status(500).send({ status: 0, message: err.message });
					else{
						res.send({ status: 1, message: 'Dirección de entrega ha sido actualizada correctamente'});
					}
				})
			}
		}
	});



}