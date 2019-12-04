const { db } = require('../db');

exports.checkUserExistance = (login, callback) => {
	db().query("SELECT user_id FROM users WHERE user_login = ?", [login], (error, results, fields) => {
	  if (callback) 
	  	callback(error, results)
	});
}

exports.registerUser = (data, callback) => {	
	let userData = [data.login, data.password];

	db().query('INSERT INTO users (user_login, user_hash) VALUES (?)', [userData], (error, results, fields) => {
		if (callback)
			callback(error, results)

		userData = null;
	});
}

exports.userLogin = (login, callback) => {	
	db().query('SELECT user_id, user_login, user_hash FROM  users WHERE user_login = ?', [login], (error, results, fields) => {
		if (callback)
			callback(error, results)
	});
}



