!function(){var e="Seleccione imagen";$("#uploadFile");Dropzone.options.uploadFile={url:"https://api.cloudinary.com/v1_1/msc/image/upload",paramName:"file",dictDefaultMessage:e,createImageThumbnails:!1,previewsContainer:!1,parallelUploads:1,init:function(){var a=$("#load_image_span"),i=$("#load_image_span"),n=this;this.on("uploadprogress",function(e,a){i.html("Subiendo <b>"+e.name+"</b>, pulsa para cancelar..."+a.toFixed(2)+"%")}),this.on("complete",function(){a.off("click.cancelUpload")}),this.on("sending",function(e,t,r){r.append("upload_preset","wbcss2yj"),i.html("Subiendo <b>"+e.name+"</b>, pulsa para cancelar..."),a.on("click.cancelUpload",function(a){a.stopPropagation(),n.removeFile(e)})}),this.on("success",function(a,n){if(n.secure_url){i.html("Archivo subido: "+a.name);var t=n.public_id,r=t.split("."),o=n.secure_url,l=o.split("/"),p="https://res.cloudinary.com/msc/image/upload/t_media_lib_thumb/"+l[6]+"/"+l[7];$(".page-content-wrapper-publication").find(".page-content").attr("style","min-height : 270px !important"),$("#images_upload").slideDown(),$("#images_upload").append('<div class="col-md-3" style="background-image: url('+p+');background-repeat: no-repeat; height: 99px;"><a href="javascript:;" class="btn_principalimage" style="margin-right: 10px; margin-top:1em;"><span class="badge badge-danger"><i class="fa fa-star"></i></span></a><a href="javascript:;" id="btn_deleteimage"><span class="badge badge-danger"><i class="fa fa-close"></i></span></a><input type="hidden" id="document_type" value="'+r[1]+'" /><input type="hidden" id="document_id" value="'+r[0]+'" /><input type="hidden" id="document_url" value="'+n.secure_url+'" /><input type="hidden" id="document_url_thumb" value="'+p+'" /></div>')}else i.text(e)}),this.on("error",function(a,n,t){n&&n.error?alert(n.error.message||"Ocurrio un error"):alert("Ocurrio un error"),i.text(e)})}}}();