

	//document.title = 'test'


	function load_products(page){

		$.ajax({
			url: '/load_products',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({page:page}),
			success: function (data) {

				console.log(data)

				$('#product_list').empty()

				var products_data = data.data;
				var contador = 0;
				var row_number = 0;

				var objpagination = data.objpagination;

				for(var i=0; i<products_data.length; i++){
					
					var _id 			= products_data[i]._id;
					var name 			= products_data[i].name;
					var code 			= products_data[i].code;
					var price 			= products_data[i].price;
					var stock 			= products_data[i].stock;
					var categorie_id 	= products_data[i].categorie_id;
					var subcategorie_id = products_data[i].subcategorie_id;
					var image 			= products_data[i].image; 	

					var principal_image = get_principal_image(image)
					var principal_image_url = '';
					//console.log(principal_image)
					try{
						if(!principal_image.document_url) principal_image_url = '';
						else{
							principal_image_url = principal_image.document_url;
						}
					}catch(err){
						principal_image_url = '';
					}
					
					contador++;

					var first_number = contador % 4;

					if(i == 0){
						row_number++;
						$('#product_list').append('<div class="row"><div class="row_'+row_number+'"></div></div>')
					}

					if(first_number == 0){
						row_number++;
						$('#product_list').append('<div class="row"><div class="row_'+row_number+'"></div></div>')
					}


					if(i == 0 || i == 1 || i == 2 || i == 3){
						
						$('#product_list').find('.row_1').append('<div class="col-md-3 col-sm-6 c-margin-b-20">'+
																	'<div class="c-content-product-2 c-bg-white c-border">'+
																		'<div class="c-content-overlay">'+
																			'<!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>-->'+
																			'<div class="c-overlay-wrapper">'+
																				'<div class="c-overlay-content"><a href="/view_product/'+_id+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div>'+
																			'</div>'+
																			'<div data-height="height" style="height: 230px; background-image: url('+principal_image_url+');" class="c-bg-img-center c-overlay-object"></div>'+
																		'</div>'+
																		'<div class="c-info">'+
																			'<p class="c-title c-font-16 c-font-slim">'+name+'</p>'+
																			'<p class="c-price c-font-14 c-font-slim">S/. '+price+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>-->'+
																		'</div>'+
																		'<div role="group" class="btn-group btn-group-justified">'+
																			'<div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div>'+
																			'<div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div>'+
																		'</div>'+
																	'</div>'+
																'</div>')
					}

					if(i == 4 || i == 5 || i == 6 || i == 7){
						$('#product_list').find('.row_2').append('<div class="col-md-3 col-sm-6 c-margin-b-20">'+
																	'<div class="c-content-product-2 c-bg-white c-border">'+
																		'<div class="c-content-overlay">'+
																			'<!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>-->'+
																			'<div class="c-overlay-wrapper">'+
																				'<div class="c-overlay-content"><a href="/view_product/'+_id+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div>'+
																			'</div>'+
																			'<div data-height="height" style="height: 230px; background-image: url('+principal_image_url+');" class="c-bg-img-center c-overlay-object"></div>'+
																		'</div>'+
																		'<div class="c-info">'+
																			'<p class="c-title c-font-16 c-font-slim">'+name+'</p>'+
																			'<p class="c-price c-font-14 c-font-slim">S/. '+price+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>-->'+
																		'</div>'+
																		'<div role="group" class="btn-group btn-group-justified">'+
																			'<div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div>'+
																			'<div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div>'+
																		'</div>'+
																	'</div>'+
																'</div>')
					}

					if(i == 8 || i == 9 || i == 10 || i == 11){
						$('#product_list').find('.row_3').append('<div class="col-md-3 col-sm-6 c-margin-b-20">'+
																	'<div class="c-content-product-2 c-bg-white c-border">'+
																		'<div class="c-content-overlay">'+
																			'<!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>-->'+
																			'<div class="c-overlay-wrapper">'+
																				'<div class="c-overlay-content"><a href="/view_product/'+_id+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div>'+
																			'</div>'+
																			'<div data-height="height" style="height: 230px; background-image: url('+principal_image_url+');" class="c-bg-img-center c-overlay-object"></div>'+
																		'</div>'+
																		'<div class="c-info">'+
																			'<p class="c-title c-font-16 c-font-slim">'+name+'</p>'+
																			'<p class="c-price c-font-14 c-font-slim">S/. '+price+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>-->'+
																		'</div>'+
																		'<div role="group" class="btn-group btn-group-justified">'+
																			'<div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div>'+
																			'<div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div>'+
																		'</div>'+
																	'</div>'+
																'</div>')
					}

					

				}


				var html = JST.pagination({ pagination: objpagination });
				$('#pagination_products').html(html);

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


	function get_principal_image(images){

		var principal_image = '';

		for(var i=0; i<images.length; i++){
			if(images[i].principal == 'principal'){
				return images[i]
				callback()
			}
		}

	}

	function load_subcategories(){

		$.ajax({
			url: '/load_subcategories',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function (data) {

				console.log(data)

							

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	function load_categories(){

		$.ajax({
			url: '/load_categories',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function (data) {

				var categorie_data = data.data;

				for(var i=0; i<categorie_data.length; i++){
					$('#categorie_list').append('<li class="c-dropdown"><a id="load_subcategories_by_categorieid" href="javascript:;" class="c-toggler" value="'+categorie_data[i]._id+'">'+categorie_data[i].name+'<span class="c-arrow"></span></a><ul class="c-dropdown-menu"></ul></li>')
				}

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}

	$('body').on('click', '#load_subcategories_by_categorieid', function(){
		
		var x = this;
		var li = x.parentNode;
		var categorie_id = $(this).attr('value');

		
		$.ajax({
			url: '/load_subcategories_by_categorieid',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({categorie_id : categorie_id}),
			success: function (data) {

				console.log(data)
				var subcategories_data = data.data;

				var li_class = $(li).prop('class');

				if(subcategories_data.length != 0){
					if(li_class == 'c-dropdown c-open'){
						$(li).prop('class', 'c-dropdown')
					}else{
						$(li).prop('class', 'c-dropdown c-open')
					}
				}else{
					$(li).prop('class', '')

					window.location.href = '/categorie/' + categorie_id;
				}
				
				
				$(li).find('ul').empty();

				for(var i=0; i<subcategories_data.length; i++){
					$(li).find('ul').append('<li><a href="/subcategorie/'+subcategories_data[i]._id+'">'+subcategories_data[i].name+'</a></li>')
				}
				
				//console.log(li)

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

		
	})

	