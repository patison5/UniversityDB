const Teacher = require('../models/teacher');

exports.hello = (req, res) => {
	console.log('hello')

	res.json({
		ok: true,
		message: "Hello, man!",
	})
}


exports.getListOfGroups = (req, res) => {

	const userId   = req.session.userId;
	const userAuth = req.session.userAuthLvl;

	if (!userId) {
		console.log("authorize first")
		return;
	} else if (userAuth == 0) {
		res.send({
			ok: false,
			message: "You do not have permissions..."
		})
	} else {
		Teacher.getTeacherIdByUserId(userId, (err, userData) => {

			if (err) {
				console.log(err)
				return;
			}
			
			var teacherId = userData[0].st_or_teach_id;

			res.send({
				ok: true,
				userId: userId,
				teacherId: teacherId,
			})

		})
	}

}