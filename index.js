var express 	= require('express');
var cookieParser= require('cookie-parser')
var app			= express();

var bodyParser	= require('body-parser');

var config		= require('./general/config');
var database	= require('./general/db');
var routes		= require('./routes');

app.set('view engine', 'jade');
app.set('trust proxy', true);
app.set('x-powered-by', false);

app.use(express.static('./public'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', routes);

database.open(function (err) {
	if(err) console.log(err.message);
	else{
		app.listen(config.port, function (err) {
			if(err) console.log(err.message);
			else console.log('Se inicio el servidor en el puerto ' + config.port);
		});
	}
});

