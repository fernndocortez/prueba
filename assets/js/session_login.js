(function () {

	$('body').on('click', '#logout', function () {

		Cookies.remove('token', { path: '/' });
		
		window.location.href = '/login'
	});

	var getSessionInfo = function (callback) {
		$.ajax({
			url: '/user/info',
			type: 'get',
			contentType: 'application/json',
			headers: { 'Authorization' : 'Token ' + Cookies.get('token') },
			success: function (data) {
				callback(data);
			},
			error: function (err) {
				alert(err.responseJSON.message);
				Cookies.remove('token', { path: '/' });
				// callback(err);
			}
		});
	};

	window.getSessionInfo = getSessionInfo;

	var token = Cookies.get('token');

	if (token) {
		getSessionInfo(function (data) {
			
			
			window.location.href = '/dashboard'
			
			//$('#dashboard-page').fadeIn();
			
		});

	} else {

		var matches = !!location.href.match(/login/);

		/*
		if(matches == true){
			window.location.href = '/login'
		}
		*/
		console.log('Usuario no se encuentra logueado')
		//$('#login-page').fadeIn();
		//window.location.href = '/login'
		
	}

})();