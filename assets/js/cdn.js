(function(){

	var dropzoneOrigText = 'Seleccione imagen';
	var contenedor = $('#uploadFile');

	Dropzone.options.uploadFile = {
		url: 'https://api.cloudinary.com/v1_1/msc/image/upload',
		paramName: 'file',
		dictDefaultMessage: dropzoneOrigText,
		createImageThumbnails: false,
		previewsContainer: false,
		parallelUploads: 1,
		init: function() {

			var dzMessage 					= $('#load_image_span')
			var firstDzMessageSpan 			= $('#load_image_span')

			var self = this;
			// dzMessage.css({ 'margin-bottom': '5px' });
			// dzMessage.append($('<span/>', { class: 'upload-progress bg-green' }));
			// var uploadProgress 			= contenedor.find('.upload-progress');

			// this.on('dragover', function(){
		// 		dzMessage.addClass('drag-inside');
		// 	});
			// this.on('dragleave', function(){
			// 	dzMessage.removeClass('drag-inside');
			// });
			// this.on('drop', function(){
			// 	dzMessage.removeClass('drag-inside');
			// });
			
			this.on('uploadprogress', function(file, progress){
				// uploadProgress.css({ width: progress+'%'});
				firstDzMessageSpan.html('Subiendo <b>'+ file.name+'</b>, pulsa para cancelar...' + progress.toFixed(2)+'%');
			});

			this.on('complete', function(){
				// firstDzMessageSpan.text(dropzoneOrigText);
				// uploadProgress.css({ width: '0%'});
				dzMessage.off('click.cancelUpload');
			});

			this.on("sending", function(file, xhr, formData) {

				// Agrego datos al formulario
				formData.append('upload_preset', 'wbcss2yj');
				// formData.append('api_key', obj.api_key);
				// formData.append('timestamp', obj.timestamp);
				// formData.append('signature', obj.signature);
				// formData.append('transformation', obj.transformation);
				// formData.append('tags', obj.tags);

				firstDzMessageSpan.html('Subiendo <b>'+ file.name+'</b>, pulsa para cancelar...');
				dzMessage.on('click.cancelUpload', function(e){
					e.stopPropagation();
						self.removeFile(file);
				});
			});

			this.on('success', function(file, res){

				if (res.secure_url) {
					firstDzMessageSpan.html('Archivo subido: ' + file.name);
					// Poner en un input hidden
					var document_type = res.public_id;
					var document_type_split = document_type.split('.');
					
					var url 		= res.secure_url;
					var url_split 	= url.split('/');
					var url_thumb 	= 'https://res.cloudinary.com/msc/image/upload/t_media_lib_thumb/' + url_split[6] + '/' + url_split[7];

					//t_media_lib_thumb
					$('.page-content-wrapper-publication').find('.page-content').attr('style', 'min-height : 270px !important');
					$('#images_upload').slideDown()
					$('#images_upload').append(
												'<div class="col-md-3" style="'+
													'background-image: url('+url_thumb+');'+
													
													'background-repeat: no-repeat; height: 99px;">'+
														'<a href="javascript:;" class="btn_principalimage" style="margin-right: 10px; margin-top:1em;"><span class="badge badge-danger"><i class="fa fa-star"></i></span></a>'+
														'<a href="javascript:;" id="btn_deleteimage">'+
															'<span class="badge badge-danger">'+
																'<i class="fa fa-close"></i>'+
															'</span>'+
														'</a>'+
														'<input type="hidden" id="document_type" value="'+document_type_split[1]+'" />'+ 
														'<input type="hidden" id="document_id" value="'+document_type_split[0]+'" />'+ 
														'<input type="hidden" id="document_url" value="'+res.secure_url+'" />'+ 
														'<input type="hidden" id="document_url_thumb" value="'+url_thumb+'" />'+ 
												'</div>' );

				} else {
					firstDzMessageSpan.text(dropzoneOrigText);
				}

			});

			this.on('error', function(file, message, err) {
				if (message && message.error) {
					alert(message.error.message || 'Ocurrio un error');
				} else {
					alert('Ocurrio un error');
				}
				firstDzMessageSpan.text(dropzoneOrigText);
			});
		}
	};
})();