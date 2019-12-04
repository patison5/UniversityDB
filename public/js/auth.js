$(".register__button").on("click", function(e) {
	e.preventDefault();

	var data = {
		login: $("#register-login").val(),
		password: $("#register-password").val(),
		passwordConfirm: $("#register-password-confirm").val()
	};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/api/auth/register'
	}).done(function(data) {		
		if (!data.ok) {
			$('.error-field').after('<p class="error">' + data.error + '</p>');

			if (data.fields) {
				data.fields.forEach(function (item) {
					$('input[name=' + item + ']').addClass('error')
				})
			}
		} else {
			$('.error-field').after('<p class="error">' + data.message + '</p>');
		}
	})
});


$(".login__button").on("click", function(e) {
	e.preventDefault();

	var data = {
		login: $("#login-login").val(),
		password: $("#login-password").val(),
	};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/api/auth/login'
	}).done(function(data) {		
		if (!data.ok) {
			$('.error-field').after('<p class="error">' + data.error + '</p>');

			if (data.fields) {
				data.fields.forEach(function (item) {
					$('input[name=' + item + ']').addClass('error')
				})
			}
		} else {			

			// начать повторы с интервалом 2 сек
			let i = 5;

			$('.error-field').after('<p class="error">' + data.message + '<br /> Перенаправление в каталог через ' + i-- +  '</p>');

			var timerId = setInterval(function() {
				$('p.error').remove();
				$('.error-field').after('<p class="error">' + data.message + '<br /> Перенаправление в каталог через ' + i-- + '</p>');
			}, 1000);

			setTimeout(function(){
				clearInterval(timerId);
			    document.location.href = '/';
			},5000);
		}
	})
});



$('input').on('focus', function () {
	$('input').removeClass('error');
	$('p.error').remove();
})