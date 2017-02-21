(function(){

	$('body').on('click', '#btn_subcategories', function(){

		remove_active_selection_ul_li()

		$(this).addClass('c-active')

		$('#my_contents_section').css('display', 'none')
		$('#categories_section').css('display', 'none')
		$('#products_section').css('display', 'none')
		$('#subcategories_section').css('display', 'block')

		$('#edit_add_update_subcategories').fadeOut();

		load_subcategories()

		setTimeout(function(){ 
			$('#my_subcategories').fadeIn();
		}, 400);


	})

	$('body').on('click', '#btn_products', function(){

		remove_active_selection_ul_li()

		load_categories_select();

		$(this).addClass('c-active')

		$('#my_contents_section').css('display', 'none')
		$('#categories_section').css('display', 'none')
		$('#subcategories_section').css('display', 'none')
		$('#products_section').css('display', 'block')

		$('#edit_add_update_products').fadeOut();

		load_products()

		setTimeout(function(){ 
			$('#my_products').fadeIn();
		}, 400);


	})


	$('body').on('click', '#btn_categories', function(){

		cancel_categorie_form()

		remove_active_selection_ul_li()

		$(this).addClass('c-active')
		
		$('#my_contents_section').css('display', 'none')
		$('#products_section').css('display', 'none')
		$('#subcategories_section').css('display', 'none')
		$('#categories_section').css('display', 'block')

		$('#edit_add_update_categories').fadeOut();

		load_categories()

		setTimeout(function(){ 
			$('#my_categories').fadeIn();
		}, 400);


		
	})

	$('body').on('click', '#btn_contents', function(){

		remove_active_selection_ul_li()

		$(this).addClass('c-active')

		$('#categories_section').css('display', 'none')
		$('#products_section').css('display', 'none')
		$('#subcategories_section').css('display', 'none')
		$('#my_contents_section').css('display', 'block')

		$('#edit_my_contents').fadeOut();

		setTimeout(function(){ 
			$('#my_contents').fadeIn();
		}, 400);


	})


	$('body').on('click', '#btn_deleteimage', function(){
		var x = this;
		var div = x.parentNode;

		$(div).remove();

	})

	$('body').on('click', '#btn_update_subcategorie_info', function(){

		$('.alert.alert-danger.subcategories').fadeOut();
		$('.alert.alert-success.subcategories').fadeOut();
		$('.alert.alert-success.subcategories02').fadeOut();
		$('.alert.alert-warning.subcategories').fadeOut();
		$('.alert.alert-danger.subcategories02').fadeOut();

		var _id 		= $('#input_subcategorie_selected').val();
		var categorie_id= $('#select_categorie').val();
		var name 		= $('#input_subcategorie_name').val();
		var description = $('#input_subcategorie_description').val();
		var content 	= $('#summernote02').summernote('code');

			if(name){

				$.ajax({
					url: '/update_subcategorie',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({	_id : _id,
											categorie_id : categorie_id,
											name : name,
											description : description,
											content : content}),
					success: function (data) {
						//console.log(data)

						load_subcategories()

						$('.alert.alert-success.subcategories02').fadeIn();

						
						cancel_subcategorie_form()

						setTimeout(function(){ 
							$('.alert.alert-success.subcategories02').fadeOut();
							$('#edit_add_update_subcategories').fadeOut();

							setTimeout(function(){ 
								$('#my_subcategories').fadeIn();
							}, 400);

						}, 3000);


					},
					error: function (err) {
						console.log(err.responseJSON.message);
						$('.alert.alert-danger.subcategories02').fadeIn();
					}
				});	

			}else{
				$('.alert.alert-warning.subcategories').fadeIn();
			}

	})

	$('body').on('click', '#btn_update_categorie_info', function(){

		$('.alert.alert-danger.categories').fadeOut();
		$('.alert.alert-success.categories').fadeOut();
		$('.alert.alert-success.categories02').fadeOut();
		$('.alert.alert-warning.categories').fadeOut();
		$('.alert.alert-danger.categories02').fadeOut();

		var _id 		= $('#input_categorie_selected').val()
		var name 		= $('#input_categorie_name').val();
		var description = $('#input_categorie_description').val();
		var content 	= $('#summernote01').summernote('code');

			if(name){

				$.ajax({
					url: '/update_categorie',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({	_id : _id,
											name : name,
											description : description,
											content : content}),
					success: function (data) {
						//console.log(data)

						load_categories()
						load_categories_select()

						$('.alert.alert-success.categories02').fadeIn();

						
						cancel_categorie_form()

						

						setTimeout(function(){ 
							$('.alert.alert-success.categories02').fadeOut();
							$('#edit_add_update_categories').fadeOut();

							setTimeout(function(){ 
								$('#my_categories').fadeIn();
							}, 400);

						}, 3000);


					},
					error: function (err) {
						console.log(err.responseJSON.message);
						$('.alert.alert-danger.categories02').fadeIn();
					}
				});	

			}else{
				$('.alert.alert-warning.categories').fadeIn();
			}
		

	})

	$('body').on('click', '#btn_add_subcategorie', function(){

		$('.alert.alert-danger.subcategories').fadeOut();
		$('.alert.alert-success.subcategories').fadeOut();
		$('.alert.alert-warning.subcategories').fadeOut();
		$('.alert.alert-danger.subcategories02').fadeOut();

		var categorie_id= $('#select_categorie').val();
		var name 		= $('#input_subcategorie_name').val();
		var description = $('#input_subcategorie_description').val();
		var content 	= $('#summernote02').summernote('code');

		if(name){

			$.ajax({
				url: '/register_new_subsubcategorie',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({	categorie_id : categorie_id,
										name : name,
										description : description,
										content : content}),
				success: function (data) {
					
					load_subcategories()

					$('.alert.alert-success.subcategories').fadeIn();

						
					cancel_subcategorie_form()

					setTimeout(function(){ 

						$('#edit_add_update_subcategories').fadeOut();

						setTimeout(function(){ 
							$('#my_subcategories').fadeIn();
						}, 400);

					}, 3000);


				},
				error: function (err) {
					console.log(err.responseJSON.message);
					$('.alert.alert-danger.subcategories02').fadeIn();
				}
			});	


		}else{
			$('.alert.alert-warning.subcategories').fadeIn();
		}

	})

	$('body').on('click', '#btn_add_categorie', function(){

		$('.alert.alert-danger.categories').fadeOut();
		$('.alert.alert-success.categories').fadeOut();
		$('.alert.alert-warning.categories').fadeOut();
		$('.alert.alert-danger.categories02').fadeOut();

		var name 		= $('#input_categorie_name').val();
		var description = $('#input_categorie_description').val();
		var content 	= $('#summernote01').summernote('code');

		/*
		var image;
		var image_count = 0;

		$('#images_upload').find('.col-md-3').each(function(){
			image_count++;

			var document_type 		= $(this).find('#document_type').val();
			var document_id 		= $(this).find('#document_id').val();
			var document_url 		= $(this).find('#document_url').val();
			var document_url_thumb 	= $(this).find('#document_url_thumb').val();
				
			image 		= {
				document_type : document_type,
				document_id : document_id,
				document_url : document_url,
				document_url_thumb : document_url_thumb
			};

		})

		if(image_count >= 2){
			$('.alert.alert-danger.categories').fadeIn();
		}else{
			*/
			if(name){

				$.ajax({
					url: '/register_new_categorie',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({	name : name,
											description : description,
											content : content}),
					success: function (data) {
						//console.log(data)

						load_categories()
						load_categories_select()

						$('.alert.alert-success.categories').fadeIn();

						
						cancel_categorie_form()

						setTimeout(function(){ 

							$('#edit_add_update_categories').fadeOut();

							setTimeout(function(){ 
								$('#my_categories').fadeIn();
							}, 400);

						}, 3000);


					},
					error: function (err) {
						console.log(err.responseJSON.message);
						$('.alert.alert-danger.categories02').fadeIn();
					}
				});	

			}else{
				$('.alert.alert-warning.categories').fadeIn();
			}
			/*
		}
		*/

	})

	$('body').on('click', '#btn_update_subcategorie', function(){

		var subcategorie_id = $(this).attr('value');

		$('#input_subcategorie_selected').val(subcategorie_id)

		$('#btn_add_subcategorie').attr('id', 'btn_update_subcategorie_info')

		$('.alert.alert-danger.subcategories').fadeOut();
		$('.alert.alert-success.subcategories').fadeOut();
		$('.alert.alert-warning.subcategories').fadeOut();
		$('.alert.alert-danger.subcategories02').fadeOut();

		$('#my_subcategories').fadeOut();

		cancel_subcategorie_form()

		$.ajax({
			url: '/load_subcategories_by_id',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({subcategorie_id:subcategorie_id}),
			success: function (data) {

				setTimeout(function(){ 
					$('#edit_add_update_subcategories').fadeIn();
				}, 400);

				
				var subcategorie_data = data.data;

				//console.log(subcategorie_data)

				var categorie_id 	= subcategorie_data.categorie_id
				var name 			= subcategorie_data.name;
				var description 	= subcategorie_data.description;
				var content 		= subcategorie_data.content;

				
				$('#input_subcategorie_name').val(name);
				$('#input_subcategorie_description').val(description);
				$('#summernote02').summernote('code', content);
				$('#select_categorie option[value="'+categorie_id+'"]').prop('selected', true);

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	})


	$('body').on('click', '#btn_update_categorie', function(){

		var categorie_id = $(this).attr('value');

		$('#input_categorie_selected').val(categorie_id)

		$('#btn_add_categorie').attr('id', 'btn_update_categorie_info')

		$('.alert.alert-danger.categories').fadeOut();
		$('.alert.alert-success.categories').fadeOut();
		$('.alert.alert-warning.categories').fadeOut();
		$('.alert.alert-danger.categories02').fadeOut();

		$('#my_categories').fadeOut();


		$.ajax({
			url: '/load_categories_by_id',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({categorie_id:categorie_id}),
			success: function (data) {

				setTimeout(function(){ 
					$('#edit_add_update_categories').fadeIn();
				}, 400);

				
				var categorie_data = data.data;

				var name 		= categorie_data.name;
				var description = categorie_data.description;
				var content 		= categorie_data.content;

				$('#input_categorie_name').val(name);
				$('#input_categorie_description').val(description);
				$('#summernote01').summernote('code', content);
				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});



		
	})

	$('body').on('click', '#btn_add_new_categorie', function(){

		cancel_categorie_form()

		$('#btn_update_categorie_info').attr('id', 'btn_add_categorie')

		$('.alert.alert-danger.categories').fadeOut();
		$('.alert.alert-success.categories').fadeOut();
		$('.alert.alert-warning.categories').fadeOut();
		$('.alert.alert-danger.categories02').fadeOut();

		$('#my_categories').fadeOut();

		setTimeout(function(){ 
			$('#edit_add_update_categories').fadeIn();
		}, 400);

	})


	$('body').on('click', '#btn_add_new_subcategorie', function(){

		cancel_subcategorie_form()

		$('#btn_update_subcategorie_info').attr('id', 'btn_add_subcategorie')

		$('.alert.alert-danger.subcategories').fadeOut();
		$('.alert.alert-success.subcategories').fadeOut();
		$('.alert.alert-warning.subcategories').fadeOut();
		$('.alert.alert-danger.subcategories02').fadeOut();

		$('#my_subcategories').fadeOut();

		setTimeout(function(){ 
			$('#edit_add_update_subcategories').fadeIn();
		}, 400);

	})

	$('body').on('click', '#btn_add_new_product', function(){

		cancel_product_form()

		$('#btn_update_product_info').attr('id', 'btn_add_product')

		$('.alert.alert-danger.products').fadeOut();
		$('.alert.alert-success.products').fadeOut();
		$('.alert.alert-warning.products').fadeOut();
		$('.alert.alert-danger.products02').fadeOut();
		$('#images_upload').empty();

		$('#my_products').fadeOut();

		setTimeout(function(){ 
			$('#edit_add_update_products').fadeIn();
		}, 400);

	})


	$('body').on('click', '#btn_update_content', function(){

		var x = this;
		var tr = x.parentNode.parentNode;

		var content_description = $(tr).find('td:nth-child(2)').text();

		$('#input_content').val(content_description)
		
		$('#my_profile_section').css('display', 'block');

		$('#my_contents').fadeOut();

		$.ajax({
			url: '/get_content_body_info',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ content_description : content_description }),
			success: function (data) {

				$('#summernote').summernote('code', '');
				$('#input_content_subtitle').val('')

				try{
					var content_body = data.data;

					$('#input_content_subtitle').val(content_body.subtitle)

					if(content_body){
						$('#summernote').summernote('code', content_body.content_body);
					}

				}catch(err){
					console.log('err')
				}
				
				

				setTimeout(function(){ 
					$('#edit_my_contents').fadeIn();
				}, 400);


			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

		
	})

	$('body').on('click', '#btn_update_content_body', function(){



		var content_description = $('#input_content').val();
		var subtitle 			= $('#input_content_subtitle').val();
		var content_body 		= $('#summernote').summernote('code');

		//console.log(content_description, content_body)

		$.ajax({
			url: '/update_content_body',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ content_description : content_description, content_body : content_body, subtitle : subtitle }),
			success: function (data) {
				console.log(data)

				$('#summernote').summernote('code', '');
				$('#input_content_subtitle').val('');

				$('.alert.alert-success').fadeIn();

				setTimeout(function(){

					$('#edit_my_contents').fadeOut();
					$('.alert.alert-success').fadeOut();

					setTimeout(function(){ 
						$('#my_contents').fadeIn();
					}, 400);

				}, 2000);
				

			},
			error: function (err) {
				alert(err.responseJSON.message);
			}
		});



	})

	function load_categories_select(){

		$('#select_categorie').empty();
		$('#select_categorie_product').empty();
		$('#select_categorie_product').append('<option></option>')

		$.ajax({
			url: '/load_categories',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function (data) {

				try{
					if(data.data.length == 0){
						console.log('Aun no hay subcategorias')
					}else{
						
						var categories_data = data.data;

						for(var i=0; i<categories_data.length; i++){
							$('#select_categorie').append('<option value="'+categories_data[i]._id+'">'+categories_data[i].name+'</option>')
							$('#select_categorie_product').append('<option value="'+categories_data[i]._id+'">'+categories_data[i].name+'</option>')
						}
					}
				}catch(err){
					console.log(err)
				}

				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	function load_categories(){

		$('.alert.alert-warning.contents').fadeOut();

		$.ajax({
			url: '/load_categories',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function (data) {

				try{
					if(data.data.length == 0){
						$('.alert.alert-warning.contents').fadeIn();
						$('#thead_categories').css('display', 'none')
					}else{
						$('#thead_categories').css('display', '')
						$('#tbody_categories').empty();

						var categories_data = data.data;

						for(var i=0; i<categories_data.length; i++){

							var categorie_description = _.truncate(categories_data[i].description, {'length': 50, 'omission': ' [...]'});

							$('#tbody_categories').append('<tr>'+
									'<td>'+(i+1)+'</td>'+
									'<td>'+categories_data[i].name+'</td>'+
									'<td>'+categorie_description+'</td>'+
									'<td><a id="btn_update_categorie" value="'+categories_data[i]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td>'+
								'</tr>')
							//_.truncate(detail_purchaseorder[i].paymentconditionsdescription, {'length': 50, 'omission': ' [...]'});
						}
					}
				}catch(err){
					console.log(err)
				}

				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	function load_products(page){

		$('.alert.alert-warning.products').fadeOut();

		$.ajax({
			url: '/load_products',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({page : page}),
			success: function (data) {

				console.log(data)
				var objpagination = data.objpagination;


				try{
					if(data.data.length == 0){
						$('.alert.alert-warning.products').fadeIn();
						$('#thead_products').css('display', 'none')
					}else{
						$('#thead_products').css('display', '')
						$('#tbody_products').empty();

						var products_data = data.data;

						for(var i=0; i<products_data.length; i++){

							var product_name = _.truncate(products_data[i].name, {'length': 50, 'omission': ' [...]'});
							var subcategorie_name = '';

							if(products_data[i].subcategorie_id.name) subcategorie_name = products_data[i].subcategorie_id.name;

							$('#tbody_products').append('<tr>'+
									'<td>'+products_data[i].code+'</td>'+
									'<td>'+products_data[i].categorie_id.name+'</td>'+
									'<td>'+subcategorie_name+'</td>'+
									'<td>'+product_name+'</td>'+
									'<td>'+Number(products_data[i].price).toFixed(2)+'</td>'+
									'<td>'+products_data[i].stock+'</td>'+
									'<td><a id="btn_update_product" value="'+products_data[i]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td>'+
								'</tr>')
							//_.truncate(detail_purchaseorder[i].paymentconditionsdescription, {'length': 50, 'omission': ' [...]'});
						}

						var html = JST.pagination({ pagination: objpagination });
						$('#pagination_products').html(html);

					}
				}catch(err){
					console.log(err)
				}

				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	$('body').on('click', '#pagination_products .pagination li a', function(){

		var page = $(this).attr('data-page');

		load_products(page)

	});

	function load_subcategories(){

		$('.alert.alert-warning.subcategories').fadeOut();

		$.ajax({
			url: '/load_subcategories',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function (data) {

				console.log(data)

				try{
					if(data.data.length == 0){
						$('.alert.alert-warning.subcategories').fadeIn();
						$('#thead_subcategories').css('display', 'none')
					}else{
						$('#thead_subcategories').css('display', '')
						$('#tbody_subcategories').empty();

						var subcategories_data = data.data;

						for(var i=0; i<subcategories_data.length; i++){

							var categorie_description = _.truncate(subcategories_data[i].description, {'length': 50, 'omission': ' [...]'});

							$('#tbody_subcategories').append('<tr>'+
									'<td>'+(i+1)+'</td>'+
									'<td>'+subcategories_data[i].name+'</td>'+
									'<td>'+categorie_description+'</td>'+
									'<td>'+subcategories_data[i].categorie_id.name+'</td>'+
									'<td><a id="btn_update_subcategorie" value="'+subcategories_data[i]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td>'+
								'</tr>')
							//_.truncate(detail_purchaseorder[i].paymentconditionsdescription, {'length': 50, 'omission': ' [...]'});
						}
					}
				}catch(err){
					console.log(err)
				}

				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	function cancel_categorie_form(){

		$('#input_categorie_name').val('');
		$('#input_categorie_description').val('');
		$('#summernote01').summernote('code', '');

	}

	function cancel_subcategorie_form(){

		$('#input_subcategorie_name').val('');
		$('#input_subcategorie_description').val('');
		$('#summernote02').summernote('code', '');

	}

	function cancel_product_form(){


		$('#input_product_name').val('')
		$('#input_product_code').val('')
		$('#input_product_price').val('')
		$('#select_categorie_product option:first').prop('selected', true)
		$('#select_subcategorie_product').empty()
		$('input[name="variable_product"]').prop('checked', false);

		$('#input_product_stock').val('')
		$('#tbody_variable').empty()

		$('#no_variables').css('display', 'none')
		$('#with_variables').css('display', 'none')

		$('#summernote03').summernote('code', '');

	}

	function remove_active_selection_ul_li(){
		$('.c-dropdown-menu').find('li').each(function(){
			$(this).removeClass( "c-active" )
		})
	}



	$('body').on('click', '#variable_product', function(){

		var variable_validation = $('input[name="variable_product"]:checked').val();
		
		if(variable_validation == 'with_variables'){
			$('#with_variables').fadeIn();
			$('#no_variables').css('display', 'none');
		}else{
			$('#no_variables').fadeIn();
			$('#with_variables').css('display', 'none');
		}

	})

	$('body').on('click', '#btn_add_variable', function(){
		$('#tbody_variable').append('<tr>'+
										'<td></td>'+
										'<td><input type="text" class="form-control c-square c-theme"/></td>'+
										'<td><input type="text" class="form-control c-square c-theme"/></td>'+
										'<td><a id="btn_remove_variable" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-trash"></i></a></td>'+
									'</tr>')

		set_number_row();
	})

	$('body').on('click', '#btn_remove_variable', function(){
		var x = this;
		var tr = x.parentNode.parentNode;

		$(tr).remove();
		set_number_row();
	})

	$('body').on('change', '#select_categorie_product', function(){

		$('#select_subcategorie_product').empty();
		var categorie_id = $(this).val();
		
		$.ajax({
			url: '/load_subcategories_by_categorieid',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({categorie_id:categorie_id}),
			success: function (data) {

				var subcategorie_data = data.data;

				if(subcategorie_data){
					$('#select_subcategorie_product').append('<option></option>');

					for(var i=0; i<subcategorie_data.length; i++){
						$('#select_subcategorie_product').append('<option value="'+subcategorie_data[i]._id+'">'+subcategorie_data[i].name+'</option>');
					}

				}

				//console.log(subcategorie_data)
				
				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	})

	$('body').on('click', '.btn_principalimage', function(){
		remove_principal_select_image();

		$(this).find('.badge.badge-danger').css('background-color', '#f6f92e')
	})

	$('body').on('click', '#btn_add_product', function(){

		$('.alert.alert-danger.products02').fadeOut();
		$('.alert.alert-danger.products').fadeOut();
		$('.alert.alert-warning.products').fadeOut();
		$('.alert.alert-success.products').fadeOut();
		$('.alert.alert-success.products02').fadeOut();

		var name 						= $('#input_product_name').val();
		var code 						= $('#input_product_code').val();
		var price 						= $('#input_product_price').val();
		var stock 						= $('#input_product_stock').val();
		var categorie_id 				= $('#select_categorie_product').val();
		var subcategorie_id 			= $('#select_subcategorie_product').val();
		var content 					= $('#summernote03').summernote('code');
		
		var tbody_variable 				= $('#tbody_variable').val();

		var image 						= [];

		$('#images_upload').find('.col-md-3').each(function(){

			var css_principal = $(this).find('.badge.badge-danger').css('background-color')
			var principal;

			if(css_principal == 'rgb(246, 249, 46)' || css_principal == '#f6f92e'){
				principal = 'principal';
			}else{
				principal = '';
			}
			
			var document_type 		= $(this).find('#document_type').val();
			var document_id 		= $(this).find('#document_id').val();
			var document_url 		= $(this).find('#document_url').val();
			var document_url_thumb 	= $(this).find('#document_url_thumb').val();
				
			image.push(	{	
							principal : principal,
							document_type : document_type,
							document_id : document_id,
							document_url : document_url,
							document_url_thumb : document_url_thumb
						});

		})

		var variables 					= [];
		var query;

		var variable_validation 		= $('input[name="variable_product"]:checked').val();

		var validation = 'disable;'

		if(name && code && price && categorie_id && content){

			if(variable_validation == 'with_variables'){
			
				stock = 0;

				$('#tbody_variable').find('tr').each(function(){
					var variable_name 	= $(this).find('td:nth-child(2) input').val();
					var variable_stock 	= $(this).find('td:nth-child(3) input').val();

					stock = Number(variable_stock) + stock

					variables.push({variable_name : variable_name, variable_stock : variable_stock})
				})

				query = {
					name : name,
					code : code,
					price : price,
					stock : stock,
					categorie_id : categorie_id,
					subcategorie_id : subcategorie_id,
					variables : variables,
					content : content,
					image : image
				}

				console.log(query);
				validation = 'enable'

			}else if(variable_validation == 'no_variables'){
				query = {
					name : name,
					code : code,
					price : price,
					stock : stock,
					categorie_id : categorie_id,
					subcategorie_id : subcategorie_id,
					variables : [],
					content : content,
					image : image
				}

				console.log(query);
				validation = 'enable'

			}else{
				validation = 'disable'
			}

		}else{
			validation = 'disable'
		}
		
		



		if(validation == 'enable'){

			$.ajax({
				url: '/register_new_product',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify(query),
				success: function (data) {

					cancel_product_form();
					
					$('.alert.alert-success.products').fadeIn();

					load_products()

					setTimeout(function(){ 
						$('.alert.alert-success.products').fadeIn();
						$('#edit_add_update_products').fadeOut();

						setTimeout(function(){ 
							$('#my_products').fadeIn();
						}, 400);

					}, 2000);
					

				},
				error: function (err) {
					console.log(err.responseJSON.message);
					$('.alert.alert-danger.products02').fadeIn();
				}
			});

		}else{
			$('.alert.alert-warning.products').fadeIn();
		}

	})

	$('body').on('click', '#btn_update_product', function(){

		var product_id = $(this).attr('value');

		$('#input_product_selected').val(product_id)

		cancel_product_form()

		$('#btn_update_product_info').attr('id', 'btn_add_product')

		$('.alert.alert-danger.products').fadeOut();
		$('.alert.alert-success.products').fadeOut();
		$('.alert.alert-warning.products').fadeOut();
		$('.alert.alert-danger.products02').fadeOut();

		$('#my_products').fadeOut();

		$.ajax({
			url: '/load_product_by_id',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({product_id:product_id}),
			success: function (data) {

				console.log(data)

				setTimeout(function(){ 
					$('#edit_add_update_products').fadeIn();
				}, 400);



			},
			error: function (err) {
				console.log(err.responseJSON.message);
				$('.alert.alert-danger.products02').fadeIn();
			}
		});

		

	})

	function remove_principal_select_image(){

		$('#images_upload').find('.btn_principalimage').each(function(){
			$(this).find('.badge.badge-danger').css('background-color', '')
		})

	}

	function set_number_row(){
		
		var tbody_count = 0;

		$('#tbody_variable').find('tr').each(function(){
			tbody_count++;
			$(this).find('td:nth-child(1)').text(tbody_count)
		})
	}

	$( document ).ready(function() {
		//load_subcategories()
		load_categories_select();
	});



})();