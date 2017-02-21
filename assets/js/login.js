(function(){

	$('body').on('click', '#btn_register', function(){

		$('.alert.alert-success').fadeOut();
		$('.alert.alert-warning').fadeOut();
		$('.alert.alert-danger').fadeOut();

		var country 			= $('#input_country').val();
		var city 				= $('#input_city').val();
		var name 				= $('#input_name').val();
		var lastname 			= $('#input_lastname').val();
		var address 			= $('#input_address').val();
		var address_optional 	= $('#input_address_optional').val();
		var mail 				= $('#input_mail').val();
		var phone 				= $('#input_phone').val();
		var username 			= $('#input_mail').val();
		var password 			= $('#input_password').val();

		if(	country && city && name && lastname && address && mail && phone && username && password){

			$.ajax({
				url: '/register_new_user',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({ 
					country 			: country,
					city 				: city,
					name 				: name,
					lastname 			: lastname,
					address 			: address,
					address_optional 	: address_optional,
					mail 				: mail,
					phone 				: phone,
					username 			: username,
					password 			: password
				 }),
				success: function (data) {

					$('.alert.alert-success').fadeIn();
					
					cancel_register_form()

					setTimeout(function(){ 
						$('#checkbox6-444').trigger('click');
						$('.alert.alert-success').fadeOut();
					}, 10000);

					
				},
				error: function (err) {
					$('.alert.alert-warning').fadeIn();
				}
			});

		}else{
			$('.alert.alert-danger').fadeIn();
		}
		


	})

	$('body').on('click', '#btn_login', function(){
		
		var username = $('#login_username').val();
		var password = $('#login_password').val();

		$.ajax({
			url: '/login',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ username: username, password: password }),
			success: function (data) {
				
				Cookies.set('token', data.data.token);

				getSessionInfo(function (data) {

					window.location.href = '/dashboard'
					
				});
			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});


	})

	function cancel_register_form(){

		$('#input_city').val('');
		$('#input_name').val('');
		$('#input_lastname').val('');
		$('#input_address').val('');
		$('#input_address_optional').val('');
		$('#input_mail').val('');
		$('#input_phone').val('');
		$('#input_mail').val('');
		$('#input_password').val('');
	}

})();