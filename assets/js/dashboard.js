( function(){

	$('body').on('click', '#btn_add_address', function(){

		$('.alert.alert-success.address').fadeOut();
		$('.alert.alert-warning.address').fadeOut();
		$('.alert.alert-danger.address').fadeOut();

		var name 		= $('#input_address_receiver_name').val();
		var lastname 	= $('#input_address_receiver_lastname').val();
		var phone_day 	= $('#input_address_receiver_phone_day').val();
		var phone_night = $('#input_address_receiver_phone_night').val();
		var mobile 		= $('#input_address_receiver_mobile').val();
		var country 	= $('#input_address_receiver_country').val();
		var address_01 	= $('#input_address_receiver_address_01').val();
		var address_02 	= $('#input_address_receiver_address_02').val();
		var city 		= $('#input_address_receiver_city').val();
		var province 	= $('#input_address_receiver_province').val();
		var postalcode 	= $('#input_address_receiver_postalcode').val();

		var query = {
			name 		: name,
			lastname 	: lastname,
			phone_day 	: phone_day,
			phone_night : phone_night,
			mobile 		: mobile,
			country 	: country,
			address_01 	: address_01,
			address_02 	: address_02,
			city 		: city,
			province 	: province,
			postalcode 	: postalcode
		};

		if(name && lastname && phone_day && country && address_01 && city && postalcode){
			$.ajax({
				url: '/add_address',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify(query),
				success: function (data) {
					console.log(data)

					load_shippingaddress_by_user()

					cancel_shipping_address_form();
					
					$('.alert.alert-success.address').fadeIn();
					
					setTimeout(function(){ 
						$('.alert.alert-success.address').fadeOut();
						$('#edit_add_update_address').fadeOut();

						setTimeout(function(){ 
							$('#my_address').fadeIn();
						}, 400);

					}, 2000);

				},
				error: function (err) {
					alert(err.responseJSON.message);
				}
			});
		}else{
			$('.alert.alert-danger.address').fadeIn();
		}

	})

	function cancel_shipping_address_form(){
		$('#input_address_receiver_name').val('');
		$('#input_address_receiver_lastname').val('');
		$('#input_address_receiver_phone_day').val('');
		$('#input_address_receiver_phone_night').val('');
		$('#input_address_receiver_mobile').val('');
		$('#input_address_receiver_address_01').val('');
		$('#input_address_receiver_address_02').val('');
		$('#input_address_receiver_city').val('');
		$('#input_address_receiver_province').val('');
		$('#input_address_receiver_postalcode').val('');
	}

	function load_shippingaddress_by_user(){

		$('.alert.alert-warning.address').fadeOut();

		$('#tbody_shipping_address').empty();

		$.ajax({
			url: '/load_shippingaddress_by_user',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ }),
			success: function (data) {
				
				var shipping_address_data = data.data;

				if(shipping_address_data){
					if(shipping_address_data.length == 0){
						$('.alert.alert-warning.address').fadeIn();
					}else{

						//console.log(shipping_address_data)
						for(var i=0; i<shipping_address_data.length; i++){
							$('#tbody_shipping_address').append('<tr>'+
																	'<td>'+
																		'<p>'+	shipping_address_data[i].name+' '+shipping_address_data[i].lastname+'<br>'+
																				shipping_address_data[i].address_01+'<br>'+
																				shipping_address_data[i].address_02+'<br>'+
																				shipping_address_data[i].city+'<br>'+
																				shipping_address_data[i].province+'<br>'+
																				shipping_address_data[i].postalcode+'<br>'+
																				shipping_address_data[i].country+'</p>'+
																	'</td>'+
																	'<td>'+
																		'<p>Teléfono durante el día '+shipping_address_data[i].phone_day+'<br>'+
																		'Teléfono durante la tarde-noche '+shipping_address_data[i].phone_night+'<br>'+
																		'Móvil '+shipping_address_data[i].mobile+'</p>'+
																	'</td>'+
																	'<td>'+
																		'<p></p>'+
																		'<p></p>'+
																	'</td>'+
																	'<td><a id="btn_update_shipping_address" value="'+shipping_address_data[i]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs"><i class="fa fa-edit"></i> Modificar</a></td>'+
																'</tr>')
						}
						
					}
				}else{
					$('.alert.alert-warning.address').fadeIn();
				}
				
			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});


	}

	$('body').on('click', '#btn_update_shipping_address', function(){

		cancel_shipping_address_form();

		var shipping_address_id = $(this).attr('value');
		
		$('#my_address').fadeOut();

		$.ajax({
			url: '/load_shippingaddress_info',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ shipping_address_id : shipping_address_id }),
			success: function (data) {
				console.log(data)

				var shipping_address_data = data.data;

				var _id 		= shipping_address_data._id;
				var address_01 	= shipping_address_data.address_01;
				var address_02 	= shipping_address_data.address_02;
				var city 		= shipping_address_data.city;
				var country 	= shipping_address_data.country;
				var createdate 	= shipping_address_data.createdate;
				var lastname 	= shipping_address_data.lastname;
				var mobile 		= shipping_address_data.mobile;
				var name 		= shipping_address_data.name;
				var phone_day 	= shipping_address_data.phone_day;
				var phone_night = shipping_address_data.phone_night;
				var postalcode 	= shipping_address_data.postalcode;
				var province 	= shipping_address_data.province;
				var user_id 	= shipping_address_data.user_id;

				$('#input_shipping_selected').val(_id);
				$('#input_address_receiver_name').val(name);
				$('#input_address_receiver_lastname').val(lastname);
				$('#input_address_receiver_phone_day').val(phone_day);
				$('#input_address_receiver_phone_night').val(phone_night);
				$('#input_address_receiver_mobile').val(mobile);
				$('#input_address_receiver_address_01').val(address_01);
				$('#input_address_receiver_address_02').val(address_02);
				$('#input_address_receiver_city').val(city);
				$('#input_address_receiver_province').val(province);
				$('#input_address_receiver_postalcode').val(postalcode);
				$('#input_address_receiver_country option[value="'+country+'"]').prop('selected', true);

				setTimeout(function(){ 
					$('#edit_add_update_address').fadeIn();
					$('#btn_add_address').prop('id', 'btn_update_address')
				}, 400);

			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});	

	})

	$('body').on('click', '#btn_update_address', function(){

		var _id 		= $('#input_shipping_selected').val();
		var address_01 	= $('#input_address_receiver_address_01').val();
		var address_02 	= $('#input_address_receiver_address_02').val();
		var city 		= $('#input_address_receiver_city').val();
		var country 	= $('#input_address_receiver_country').val();
		var lastname 	= $('#input_address_receiver_lastname').val();
		var mobile 		= $('#input_address_receiver_mobile').val();
		var name 		= $('#input_address_receiver_name').val();
		var phone_day 	= $('#input_address_receiver_phone_day').val();
		var phone_night = $('#input_address_receiver_phone_night').val();
		var postalcode 	= $('#input_address_receiver_postalcode').val();
		var province 	= $('#input_address_receiver_province').val();


		var query = {
			_id			: _id,
			name 		: name,
			lastname 	: lastname,
			phone_day 	: phone_day,
			phone_night : phone_night,
			mobile 		: mobile,
			country 	: country,
			address_01 	: address_01,
			address_02 	: address_02,
			city 		: city,
			province 	: province,
			postalcode 	: postalcode
		};

		if(name && lastname && phone_day && country && address_01 && city && postalcode){
			$.ajax({
				url: '/update_address',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify(query),
				success: function (data) {
					console.log(data)

					load_shippingaddress_by_user()

					cancel_shipping_address_form();
					
					$('.alert.alert-success.address').fadeIn();
					
					setTimeout(function(){ 
						$('.alert.alert-success.address').fadeOut();
						$('#edit_add_update_address').fadeOut();

						setTimeout(function(){ 
							$('#my_address').fadeIn();
						}, 400);

					}, 2000);

				},
				error: function (err) {
					alert(err.responseJSON.message);
				}
			});
		}else{
			$('.alert.alert-danger.address').fadeIn();
		}



	})

	$('body').on('click', '#btn_add_new_address', function(){

		cancel_shipping_address_form();

		$('#my_address').fadeOut();

		$.ajax({
			url: '/user/info',
			type: 'get',
			contentType: 'application/json',
			data: JSON.stringify({ }),
			success: function (data) {

				var user_data = data.data.user;

				var name 		= user_data.name;
				var lastname 	= user_data.lastname;

				$('#input_address_receiver_name').val(name)
				$('#input_address_receiver_lastname').val(lastname)				

				setTimeout(function(){ 
					$('#edit_add_update_address').fadeIn();
					$('#btn_update_address').prop('id', 'btn_add_address')
				}, 400);

			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});
		
	})

	$('body').on('click', '#view_my_profile', function(){

		remove_active_selection_ul_li()

		$('#my_address_section').css('display', 'none');

		$('#my_profile_section').css('display', 'block');
		$('#edit_my_profile').css('display', 'none');
		$('#my_profile').css('display', 'block');

		$(this).addClass('c-active')
	})

	$('body').on('click', '#view_my_address', function(){

		remove_active_selection_ul_li()
		load_shippingaddress_by_user()

		$('#my_profile_section').css('display', 'none');


		$('#my_address_section').css('display', 'block');
		$('#edit_add_update_address').css('display', 'none');
		$('#my_address').css('display', 'block');

		$(this).addClass('c-active')
	})

	function remove_active_selection_ul_li(){
		$('.c-dropdown-menu').find('li').each(function(){
			$(this).removeClass( "c-active" )
		})
	}

	$('body').on('click', '#btn_update_my_profile', function(){

		$('#my_profile').fadeOut();

		$.ajax({
			url: '/user/info',
			type: 'get',
			contentType: 'application/json',
			data: JSON.stringify({ }),
			success: function (data) {

				var user_data = data.data.user;

				var username 	= user_data.username;
				var password 	= user_data.password;
				var country 	= user_data.country;
				var city 		= user_data.city;
				var name 		= user_data.name;
				var lastname 	= user_data.lastname;
				var address 	= user_data.address;
				var address_optional = user_data.address_optional;
				var mail 		= user_data.mail;
				var phone 		= user_data.phone;

				$('#input_username').val(username)
				$('#input_country option[value="'+country+'"]').prop('selected', true);
				$('#input_city').val(city);
				$('#input_name').val(name);
				$('#input_lastname').val(lastname);
				$('#input_address').val(address);
				$('#input_address_optional').val(address_optional);
				$('#input_mail').val(mail);
				$('#input_phone').val(phone);

				setTimeout(function(){ 
					$('#edit_my_profile').fadeIn();
				}, 400);

			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});

	})

	$('body').on('click', '#btn_update_profile', function(){
		
		$('.alert.alert-success').fadeOut();
		$('.alert.alert-warning').fadeOut();
		$('.alert.alert-danger').fadeOut();


		var username 			= $('#input_username').val();
		var country 			= $('#input_country').val();
		var city 				= $('#input_city').val(); 
		var name 				= $('#input_name').val(); 
		var lastname 			= $('#input_lastname').val(); 
		var address 			= $('#input_address').val(); 
		var address_optional 	= $('#input_address_optional').val(); 
		var mail 				= $('#input_mail').val(); 
		var phone 				= $('#input_phone').val(); 

		var query = {
						username : username,
						country : country,
						city : city,
						name : name,
						lastname : lastname,
						address : address,
						address_optional : address_optional,
						mail : mail,
						phone : phone
					};

		if(	username && country && city && name && lastname && address && mail && phone && username){

			$.ajax({
				url: '/update_user_profile',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify(query),
				success: function (data) {
					
					load_user_info()
					$('.alert.alert-success').fadeIn();
					
					setTimeout(function(){ 
						$('.alert.alert-success').fadeOut();
						$('#edit_my_profile').fadeOut();

						setTimeout(function(){ 
							$('#my_profile').fadeIn();
						}, 400);

					}, 2000);

				},
				error: function (err) {
					$('.alert.alert-warning').fadeIn();
				}
			});
		}else{
			$('.alert.alert-danger').fadeIn();
		}


	})

	function load_user_info(){

		$.ajax({
			url: '/user/info',
			type: 'get',
			contentType: 'application/json',
			data: JSON.stringify({ }),
			success: function (data) {

				var user_data = data.data.user;

				var username 	= user_data.username;
				var password 	= user_data.password;
				var country 	= user_data.country;
				var city 		= user_data.city;
				var name 		= user_data.name;
				var lastname 	= user_data.lastname;
				var address 	= user_data.address;
				var address_optional = user_data.address_optional;
				var mail 		= user_data.mail;
				var phone 		= user_data.phone;

				$('#lbl_user_name').text(name)
				$('#lbl_user_lasname').text(lastname);
				$('#lbl_user_mail').text(mail);
				$('#lbl_user_phone').text(phone);
				

				

			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});

	}

	$( document ).ready(function() {
		load_user_info();
	});


})();
