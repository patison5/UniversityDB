const { db } = require('../db');

exports.hello = (login, callback) => {
	db().query("SELECT user_id FROM users WHERE user_login = ?", [login], (error, results, fields) => {
		if (callback) 
			callback(error, results)
	});
}


exports.getListOfGroups = (id, callback) => {
	db().query("SELECT * users FROM group_teacher_subject_connector WHERE teacher_id = ?", [id], (error, results, fields) => {
		if (callback) 
			callback(error, results)
	});
}


exports.getTeacherIdByUserId = (userId, callback) => {
	db().query("SELECT st_or_teach_id FROM users WHERE user_login = ?", [userId], (error, results, fields) => {
		if (callback) 
			callback(error, results)
	});
}


exports.getTeacherDataById = (callback) => {
	db().query("SELECT st_or_teach_id FROM users WHERE user_login = ?", [userId], (error, results, fields) => {
		if (callback) 
			callback(error, results)
	});
}
