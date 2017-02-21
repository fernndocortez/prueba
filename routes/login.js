var config 	= require('../general/config');
var db     	= require('../general/db');
var jwt		= require('jwt-simple');
var bcrypt 	= require('bcrypt');

exports.login = function(req, res){

	var username 	= req.body.username;
	var password 	= req.body.password;

	var user 		= db.conn.collection('user');

	user.findOne({ username: username }, function (err, user_data) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (user_data) {
				bcrypt.compare(password, user_data.password, function (err, valid) {
					if (err) res.status(500).send({ status: 0, message: err.message });
					else {
						if(user_data.status == 'enable'){
							if (valid) {

								var token = jwt.encode({ userId: (user_data._id + ''), timestamp: +new Date }, config.jwt);

								res.send({ status: 1, message: '¡Listo! Ingreso correcto', data: { token: token } });

							} else {
								res.status(500).send({ status: 0, message: 'Uy! Usuario o contraseña incorrectos' });
							}
						}else if(user_data.status == 'disable'){
							
							res.status(500).send({ status: 0, message: 'Error: El usuario ha sido inhabilitado del sistema' });
						}else{
							res.status(500).send({ status: 0, message: 'Error: Usuario no encontrado' });
						}
						
					}
				});
			} else {
				res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
			}
		}
	});

}

exports.register_new_user = function(req, res){


	var country				= req.body.country;
	var city 				= req.body.city;
	var name 				= req.body.name;
	var lastname 			= req.body.lastname;
	var address 			= req.body.address;
	var address_optional 	= req.body.address_optional;
	var mail 				= req.body.mail;
	var phone 				= req.body.phone;
	var username 			= req.body.username;
	var password 			= req.body.password;

	var user 				= db.conn.collection('user');

	user.findOne({ username: username }, function (err, user_validation_01) {
		if (err) res.status(500).send({ status: 0, message: err.message });
		else {
			if (!user_validation_01) {

				bcrypt.hash(password, 2, function(err, hash) {

					password = hash; 

					var query = {
									username 			: username,
									password 			: password,
									country 			: country,
									city 				: city,
									name 				: name,
									lastname 			: lastname,
									address 			: address,
									address_optional 	: address_optional,
									mail 				: mail,
									phone 				: phone,
									status 				: 'enable',
									createdate 			: new Date()
								}

					user.insertOne(query, function (err, user_validation_02) {
						if (err) res.status(500).send({ status: 0, message: err.message });
						else {
							if (user_validation_02) {
								res.send({ status: 1, message: 'Usuario ha sido registrado' });
							} else {
								res.status(500).send({ status: 0, message: 'Usuario no fue registrado' });
							}
						}
					});

				});

			} else {
				res.status(500).send({ status: 0, message: 'Usuario ya se encuentra registrado' });
			}
		}
	});

}