$(function(){

	function get_content_data(){

		var path = window.location.pathname.substring(1);

		if(path == 'aboutus') path = 'NOSOTROS';
		if(path == 'faq') path = 'TERMINOS Y CONDICIONES (FAQ)';
		if(path == 'brands') path = 'MARCAS';
		if(path == 'help') path = 'AYUDA';

		$.ajax({
			url: '/get_content_body_info',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify({ content_description : path }),
			success: function (data) {

				console.log(data)
				$('#content_title').text(path)
				$('#content_subtitle').text(data.data.subtitle)
				$('#content_body').append(data.data.content_body)

			},
			error: function (err) {
				console.log(err.responseJSON.message);
			}
		});
	}

	$( document ).ready(function() {
		get_content_data();
	});


})();
