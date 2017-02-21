var environment = process.env.NODE_ENV || 'development';
var config = {
	production: {
		env: environment,
		port: 9000,
		db: 'mongodb://localhost:27017/newbutterfly',
		jwt: 'xRKXUWKnnloHRo5QfpghZzVOtEkV2ZYxvApnxIsp33t'
	},
	qa: {
		env: environment,
		port: 7002,
		db: 'mongodb://localhost:27017/newbutterfly',
		jwt: 'xRKXUWKnnloHRo5QfpghZzVOtEkV2ZYxvApnxIsp33t'
	},
	development: {
		env: environment,
		port: 8000,
		db: 'mongodb://localhost:27017/newbutterfly',
		jwt: 'test'
	}
};

module.exports = config[environment];