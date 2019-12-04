const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const validator = require("email-validator");

exports.login = (req, res) => {

	// можно ли так хранить?
	const id 	= req.session.userId;
	const login = req.session.userLogin;

	res.render('auth', {
		user: {
			id,
			login
		}
	});
}

exports.logout = (req, res) => {
	if (req.session) {
		req.session.destroy(() => {
			res.clearCookie("user_cookie");
			res.redirect('/api/auth');
		})
	} else {
		res.redirect('/api/auth');
	}
}


exports.userLogin = (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	if (!login || !password) {
		res.json({
			ok: false,
			error: "Все поля должы быть заполнены!",
			fields: ['login', 'password']
		})
	} else if (!validator.validate(login)) {
		res.json({
			ok: false,
			error: "Введите правильный email: example@mail.com",
			fields: ['login']
		})
	} else {
		User.userLogin(login, (err, docs) => {
			if (err) {
				console.log(err);
				return res.json({
					ok: false,
					error: "Ошибка сервера",
					fields: ['login', 'password']
				})
			} else {
				if (docs.length <= 0) {
					res.json({
						ok: false, 
						error: "Неправильный логин или пароль!"
					})
				} else {
					bcrypt.compare(password, docs[0].user_hash, (err, flag) => {
					    if (flag) {
					    	var hour = 3600000;
							req.session.cookie.expires = new Date(Date.now() + hour)
							req.session.cookie.maxAge = hour

					    	req.session.userId 	  = docs[0].user_id;
					    	req.session.userLogin = docs[0].user_login;

					    	res.json({
								ok: true, 
								message: "Добро пожаловать!",
							})
					    } else {
					    	res.json({
								ok: false, 
								error: "Неправильный логин или пароль!",
								fields: ['login', 'password']
							})
					    }
					});		
				}
			}
		});
	}
}


exports.registerUser = (req, res) => {
	const login = req.body.login;
	const password = req.body.password;
	const passwordConfirm = req.body.passwordConfirm;

	if (!login || !password || !passwordConfirm) {
		const fields = [];
		if (!login) fields.push('login');
		if (!password) fields.push('password');
		if (!passwordConfirm) fields.push('passwordConfirm');

		res.json({
			ok: false,
			error: "Все поля должны быть заполнены!",
			fields: fields
		});
	} else if (login.length < 3 || login.length > 25) {
		res.json({
			ok: false,
			error: "Длина логина от 3 до 16 символов!",
			fields: ['login']
		})
	} else if (!validator.validate(login)) {
		console.log(validator.validate(login), login)
		res.json({
			ok: false,
			error: "Введите правильный email: example@mail.com",
			fields: ['login']
		})
	} else if (password !== passwordConfirm) {
		res.json({
			ok: false,
			error: "Пароли не совпадают!",
			fields: ['password', 'passwordConfirm']
		})
	} else if (password.length < 5) {
		res.json({
			ok: false,
			error: "Минимальная длинна пароля 5 символов!",
			fields: ['password', 'passwordConfirm']
		})
	} else {
		User.checkUserExistance(login, (error, result) => {
			if (result.length > 0) {
			  	res.json({
					ok: false,
					error: "Пользователь с таким именем уже существует!",
					fields: ['login']
				})
			} else {
				bcrypt.hash(password, null, null, (err, hash) => {
					User.registerUser({
						login: login,
						password: hash
					}, (error,  user) => {
						if (error) {
							console.log(error)
							return res.json({
								ok: false,
								error: "Ошибка записи в базу данных",
								fields: ['login', 'password']
							})
						}

						req.session.userId = user.insertId;
					    req.session.userLogin = login;

						res.json({
							ok: true, 
							message: "Регистрация прошла успешно!"
						})
					})
				})
			}
		})		
	}
}