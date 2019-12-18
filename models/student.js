const { db } = require('../db');

exports.hello = (login, callback) => {
	db().query("SELECT user_id FROM users WHERE user_login = ?", [login], (error, results, fields) => {
		if (callback) 
			callback(error, results)
	});
}