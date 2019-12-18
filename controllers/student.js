const Student = require('../models/student');

exports.hello = (req, res) => {
	console.log('hello')

	res.json({
		ok: false,
		error: "Все поля должы быть заполнены!",
		fields: ['login', 'password']
	})
}