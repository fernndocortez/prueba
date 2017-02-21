(function(){

	function load_product_by_id(){

		var product_id = window.location.pathname.split('/')[2];

		$.ajax({
			url: '/load_product_by_id',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({product_id:product_id}),
			success: function (data) {

				console.log(data)
				var product_data = data.data;

				var name 			= product_data.name;
				var price 	= product_data.price;
				var stock 	= product_data.stock;
				var content 		= product_data.content;

				document.title = 'Butterfly | ' + name
				$('.c-font-uppercase.c-font-bold').text(name)
				$('.c-product-price').text('S/. '+ price)
				$('#product_content').html(content + '<br><br><br>')
				

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});

	}


	$( document ).ready(function() {
		//load_products()
		load_categories();
		load_product_by_id();
		//load_products()
	});



})()