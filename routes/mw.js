var config 	= require('../general/config');
var db     	= require('../general/db');
var jwt		= require('jwt-simple');

var cacheVar = +new Date();

exports.appendCacheVar = function (req, res, next) {
	res.locals.cache_ = '?' + cacheVar;
	next();
};

exports.clear = function (req, res, next) {
	req.session = null;
	next();
};

exports.obtieneSesion = function(req, res, next) {
	if(req.headers.authorization) {
		var token = req.headers.authorization.split(" ")[1];
		try{
			var payload 	= jwt.decode(token, config.jwt);
			req.session 	= payload;

			next();
		} catch(e) {
			console.error(e);
			next();
		}
	} else if (req.cookies && req.cookies.token) {
		var token = req.cookies.token;
		try{
			var payload 	= jwt.decode(token, config.jwt);
			req.session 	= payload;

			next();
		} catch(e) {
			console.error(e);
			next();
		}
	} else next();
}

exports.validaSesion = function (req, res, next) {

	if(!req.session) {
		if (req.xhr) {

			return res.status(403).send({message: "No tiene permiso para solicitar este recurso."});
		} else {
			return res.redirect('/');
		}
	} else next();
}



exports.validaEstadoUsuario = function (req, res, next) {

	if(req.session) {

		var userId = req.session.userId;

		var usuario = db.conn.collection('user');

		usuario.findOne({ _id: db.ObjectID(userId) }, function (err, user) {
			if (err) res.status(500).send({ status: 0, message: err.message });
			else {
				if (user.status == 'enable') {
					next();
				} else {
					return res.status(403).send({message: "No tiene permiso para solicitar este recurso."});
				}
			}
		});

	} else {
		if (req.xhr) {
			return res.status(403).send({message: "No tiene permiso para solicitar este recurso."});
		} else {
			return res.redirect('/');
		}
	};
	
}

exports.obtieneDatosUsuario = function (req, res, next) {

	if(req.session) {

		var userId = req.session.userId;

		var usuario = db.conn.collection('user');
		usuario.findOne({ _id: db.ObjectID(userId) }, function (err, user) {
			if (err) res.status(500).send({ status: 0, message: err.message });
			else {
				if (user) {
					console.log(user.username);
					res.locals.user = user;
					next();
				} else {
					res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
					next();
				}
			}
		});

	} else {
		if (req.xhr) {
			return res.status(403).send({message: "No tiene permiso para solicitar este recurso."});
		} else {
			return res.redirect('/');
		}
	};
}

exports.senduser = function (req, res, next) {

	if(req.session) {

		var userId = req.session.userId;

		var usuario = db.conn.collection('user');
		usuario.findOne({ _id: db.ObjectID(userId) }, function (err, user) {
			if (err) res.status(500).send({ status: 0, message: err.message });
			else {
				if (user) {
					console.log(user.username);
					res.locals.user = user;
					next();
				} else {
					res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
					next();
				}
			}
		});

	} else {
		next()
	};
}



exports.index = function (req, res) {
	res.render('index');
};

exports.login = function(req, res){
	res.render('login')
}

exports.aboutus = function(req, res){
	res.render('content')
}

exports.help = function(req, res){
	res.render('content')
}

exports.faq = function(req, res){
	res.render('content')
}

exports.contactus = function(req, res){
	res.render('contact')
}

exports.products = function(req, res){
	res.render('products')
}

exports.load_categorie_page = function(req, res){
	var categorie_id 	= req.params.id;

	res.render('categorie_page', { categorie_id: categorie_id });
}

exports.load_subcategorie_page = function(req, res){
	var subcategorie_id 	= req.params.id;

	res.render('subcategorie_page', { subcategorie_id: subcategorie_id });
}

exports.load_product_page = function(req, res){
	var product_id 	= req.params.id;

	res.render('product_page', { product_id: product_id });
}

exports.dashboard = function (req, res) {

	if(req.session) {

		var userId = req.session.userId;

		var usuario = db.conn.collection('user');

		usuario.findOne({ _id: db.ObjectID(userId) }, function (err, user) {
			if (err) res.status(500).send({ status: 0, message: err.message });
			else {
				if (user) {

					var user_role = user.role;

					if(user_role == 'administrador'){
						res.render('dashboard_admin');
					}else{
						res.render('dashboard');	
					}
					

				} else {
					res.status(500).send({ status: 0, message: 'Usuario no encontrado' });
				}
			}
		});		

	} else {
		if (req.xhr) {
			return res.status(403).send({message: "No tiene permiso para solicitar este recurso."});
		} else {
			return res.redirect('/');
		}
	};


	
};
