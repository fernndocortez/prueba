!function(){function e(){$("#select_categorie").empty(),$("#select_categorie_product").empty(),$("#select_categorie_product").append("<option></option>"),$.ajax({url:"/load_categories",type:"post",contentType:"application/json",data:JSON.stringify({}),success:function(e){try{if(0==e.data.length)console.log("Aun no hay subcategorias");else for(var t=e.data,a=0;a<t.length;a++)$("#select_categorie").append('<option value="'+t[a]._id+'">'+t[a].name+"</option>"),$("#select_categorie_product").append('<option value="'+t[a]._id+'">'+t[a].name+"</option>")}catch(n){console.log(n)}},error:function(e){console.log(e.responseJSON.message)}})}function t(){$(".alert.alert-warning.contents").fadeOut(),$.ajax({url:"/load_categories",type:"post",contentType:"application/json",data:JSON.stringify({}),success:function(e){try{if(0==e.data.length)$(".alert.alert-warning.contents").fadeIn(),$("#thead_categories").css("display","none");else{$("#thead_categories").css("display",""),$("#tbody_categories").empty();for(var t=e.data,a=0;a<t.length;a++){var n=_.truncate(t[a].description,{length:50,omission:" [...]"});$("#tbody_categories").append("<tr><td>"+(a+1)+"</td><td>"+t[a].name+"</td><td>"+n+'</td><td><a id="btn_update_categorie" value="'+t[a]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td></tr>')}}}catch(o){console.log(o)}},error:function(e){console.log(e.responseJSON.message)}})}function a(e){$(".alert.alert-warning.products").fadeOut(),$.ajax({url:"/load_products",type:"post",contentType:"application/json",data:JSON.stringify({page:e}),success:function(e){console.log(e);var t=e.objpagination;try{if(0==e.data.length)$(".alert.alert-warning.products").fadeIn(),$("#thead_products").css("display","none");else{$("#thead_products").css("display",""),$("#tbody_products").empty();for(var a=e.data,n=0;n<a.length;n++){var o=_.truncate(a[n].name,{length:50,omission:" [...]"}),s="";a[n].subcategorie_id.name&&(s=a[n].subcategorie_id.name),$("#tbody_products").append("<tr><td>"+a[n].code+"</td><td>"+a[n].categorie_id.name+"</td><td>"+s+"</td><td>"+o+"</td><td>"+Number(a[n].price).toFixed(2)+"</td><td>"+a[n].stock+'</td><td><a id="btn_update_product" value="'+a[n]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td></tr>')}var c=JST.pagination({pagination:t});$("#pagination_products").html(c)}}catch(i){console.log(i)}},error:function(e){console.log(e.responseJSON.message)}})}function n(){$(".alert.alert-warning.subcategories").fadeOut(),$.ajax({url:"/load_subcategories",type:"post",contentType:"application/json",data:JSON.stringify({}),success:function(e){console.log(e);try{if(0==e.data.length)$(".alert.alert-warning.subcategories").fadeIn(),$("#thead_subcategories").css("display","none");else{$("#thead_subcategories").css("display",""),$("#tbody_subcategories").empty();for(var t=e.data,a=0;a<t.length;a++){var n=_.truncate(t[a].description,{length:50,omission:" [...]"});$("#tbody_subcategories").append("<tr><td>"+(a+1)+"</td><td>"+t[a].name+"</td><td>"+n+"</td><td>"+t[a].categorie_id.name+'</td><td><a id="btn_update_subcategorie" value="'+t[a]._id+'" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-edit"></i></a></td></tr>')}}}catch(o){console.log(o)}},error:function(e){console.log(e.responseJSON.message)}})}function o(){$("#input_categorie_name").val(""),$("#input_categorie_description").val(""),$("#summernote01").summernote("code","")}function s(){$("#input_subcategorie_name").val(""),$("#input_subcategorie_description").val(""),$("#summernote02").summernote("code","")}function c(){$("#input_product_name").val(""),$("#input_product_code").val(""),$("#input_product_price").val(""),$("#select_categorie_product option:first").prop("selected",!0),$("#select_subcategorie_product").empty(),$('input[name="variable_product"]').prop("checked",!1),$("#input_product_stock").val(""),$("#tbody_variable").empty(),$("#no_variables").css("display","none"),$("#with_variables").css("display","none"),$("#summernote03").summernote("code","")}function i(){$(".c-dropdown-menu").find("li").each(function(){$(this).removeClass("c-active")})}function r(){$("#images_upload").find(".btn_principalimage").each(function(){$(this).find(".badge.badge-danger").css("background-color","")})}function d(){var e=0;$("#tbody_variable").find("tr").each(function(){e++,$(this).find("td:nth-child(1)").text(e)})}$("body").on("click","#btn_subcategories",function(){i(),$(this).addClass("c-active"),$("#my_contents_section").css("display","none"),$("#categories_section").css("display","none"),$("#products_section").css("display","none"),$("#subcategories_section").css("display","block"),$("#edit_add_update_subcategories").fadeOut(),n(),setTimeout(function(){$("#my_subcategories").fadeIn()},400)}),$("body").on("click","#btn_products",function(){i(),e(),$(this).addClass("c-active"),$("#my_contents_section").css("display","none"),$("#categories_section").css("display","none"),$("#subcategories_section").css("display","none"),$("#products_section").css("display","block"),$("#edit_add_update_products").fadeOut(),a(),setTimeout(function(){$("#my_products").fadeIn()},400)}),$("body").on("click","#btn_categories",function(){o(),i(),$(this).addClass("c-active"),$("#my_contents_section").css("display","none"),$("#products_section").css("display","none"),$("#subcategories_section").css("display","none"),$("#categories_section").css("display","block"),$("#edit_add_update_categories").fadeOut(),t(),setTimeout(function(){$("#my_categories").fadeIn()},400)}),$("body").on("click","#btn_contents",function(){i(),$(this).addClass("c-active"),$("#categories_section").css("display","none"),$("#products_section").css("display","none"),$("#subcategories_section").css("display","none"),$("#my_contents_section").css("display","block"),$("#edit_my_contents").fadeOut(),setTimeout(function(){$("#my_contents").fadeIn()},400)}),$("body").on("click","#btn_deleteimage",function(){var e=this,t=e.parentNode;$(t).remove()}),$("body").on("click","#btn_update_subcategorie_info",function(){$(".alert.alert-danger.subcategories").fadeOut(),$(".alert.alert-success.subcategories").fadeOut(),$(".alert.alert-success.subcategories02").fadeOut(),$(".alert.alert-warning.subcategories").fadeOut(),$(".alert.alert-danger.subcategories02").fadeOut();var e=$("#input_subcategorie_selected").val(),t=$("#select_categorie").val(),a=$("#input_subcategorie_name").val(),o=$("#input_subcategorie_description").val(),c=$("#summernote02").summernote("code");a?$.ajax({url:"/update_subcategorie",type:"post",contentType:"application/json",data:JSON.stringify({_id:e,categorie_id:t,name:a,description:o,content:c}),success:function(e){n(),$(".alert.alert-success.subcategories02").fadeIn(),s(),setTimeout(function(){$(".alert.alert-success.subcategories02").fadeOut(),$("#edit_add_update_subcategories").fadeOut(),setTimeout(function(){$("#my_subcategories").fadeIn()},400)},3e3)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.subcategories02").fadeIn()}}):$(".alert.alert-warning.subcategories").fadeIn()}),$("body").on("click","#btn_update_categorie_info",function(){$(".alert.alert-danger.categories").fadeOut(),$(".alert.alert-success.categories").fadeOut(),$(".alert.alert-success.categories02").fadeOut(),$(".alert.alert-warning.categories").fadeOut(),$(".alert.alert-danger.categories02").fadeOut();var a=$("#input_categorie_selected").val(),n=$("#input_categorie_name").val(),s=$("#input_categorie_description").val(),c=$("#summernote01").summernote("code");n?$.ajax({url:"/update_categorie",type:"post",contentType:"application/json",data:JSON.stringify({_id:a,name:n,description:s,content:c}),success:function(a){t(),e(),$(".alert.alert-success.categories02").fadeIn(),o(),setTimeout(function(){$(".alert.alert-success.categories02").fadeOut(),$("#edit_add_update_categories").fadeOut(),setTimeout(function(){$("#my_categories").fadeIn()},400)},3e3)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.categories02").fadeIn()}}):$(".alert.alert-warning.categories").fadeIn()}),$("body").on("click","#btn_add_subcategorie",function(){$(".alert.alert-danger.subcategories").fadeOut(),$(".alert.alert-success.subcategories").fadeOut(),$(".alert.alert-warning.subcategories").fadeOut(),$(".alert.alert-danger.subcategories02").fadeOut();var e=$("#select_categorie").val(),t=$("#input_subcategorie_name").val(),a=$("#input_subcategorie_description").val(),o=$("#summernote02").summernote("code");t?$.ajax({url:"/register_new_subsubcategorie",type:"post",contentType:"application/json",data:JSON.stringify({categorie_id:e,name:t,description:a,content:o}),success:function(e){n(),$(".alert.alert-success.subcategories").fadeIn(),s(),setTimeout(function(){$("#edit_add_update_subcategories").fadeOut(),setTimeout(function(){$("#my_subcategories").fadeIn()},400)},3e3)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.subcategories02").fadeIn()}}):$(".alert.alert-warning.subcategories").fadeIn()}),$("body").on("click","#btn_add_categorie",function(){$(".alert.alert-danger.categories").fadeOut(),$(".alert.alert-success.categories").fadeOut(),$(".alert.alert-warning.categories").fadeOut(),$(".alert.alert-danger.categories02").fadeOut();var a=$("#input_categorie_name").val(),n=$("#input_categorie_description").val(),s=$("#summernote01").summernote("code");a?$.ajax({url:"/register_new_categorie",type:"post",contentType:"application/json",data:JSON.stringify({name:a,description:n,content:s}),success:function(a){t(),e(),$(".alert.alert-success.categories").fadeIn(),o(),setTimeout(function(){$("#edit_add_update_categories").fadeOut(),setTimeout(function(){$("#my_categories").fadeIn()},400)},3e3)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.categories02").fadeIn()}}):$(".alert.alert-warning.categories").fadeIn()}),$("body").on("click","#btn_update_subcategorie",function(){var e=$(this).attr("value");$("#input_subcategorie_selected").val(e),$("#btn_add_subcategorie").attr("id","btn_update_subcategorie_info"),$(".alert.alert-danger.subcategories").fadeOut(),$(".alert.alert-success.subcategories").fadeOut(),$(".alert.alert-warning.subcategories").fadeOut(),$(".alert.alert-danger.subcategories02").fadeOut(),$("#my_subcategories").fadeOut(),s(),$.ajax({url:"/load_subcategories_by_id",type:"post",contentType:"application/json",data:JSON.stringify({subcategorie_id:e}),success:function(e){setTimeout(function(){$("#edit_add_update_subcategories").fadeIn()},400);var t=e.data,a=t.categorie_id,n=t.name,o=t.description,s=t.content;$("#input_subcategorie_name").val(n),$("#input_subcategorie_description").val(o),$("#summernote02").summernote("code",s),$('#select_categorie option[value="'+a+'"]').prop("selected",!0)},error:function(e){console.log(e.responseJSON.message)}})}),$("body").on("click","#btn_update_categorie",function(){var e=$(this).attr("value");$("#input_categorie_selected").val(e),$("#btn_add_categorie").attr("id","btn_update_categorie_info"),$(".alert.alert-danger.categories").fadeOut(),$(".alert.alert-success.categories").fadeOut(),$(".alert.alert-warning.categories").fadeOut(),$(".alert.alert-danger.categories02").fadeOut(),$("#my_categories").fadeOut(),$.ajax({url:"/load_categories_by_id",type:"post",contentType:"application/json",data:JSON.stringify({categorie_id:e}),success:function(e){setTimeout(function(){$("#edit_add_update_categories").fadeIn()},400);var t=e.data,a=t.name,n=t.description,o=t.content;$("#input_categorie_name").val(a),$("#input_categorie_description").val(n),$("#summernote01").summernote("code",o)},error:function(e){console.log(e.responseJSON.message)}})}),$("body").on("click","#btn_add_new_categorie",function(){o(),$("#btn_update_categorie_info").attr("id","btn_add_categorie"),$(".alert.alert-danger.categories").fadeOut(),$(".alert.alert-success.categories").fadeOut(),$(".alert.alert-warning.categories").fadeOut(),$(".alert.alert-danger.categories02").fadeOut(),$("#my_categories").fadeOut(),setTimeout(function(){$("#edit_add_update_categories").fadeIn()},400)}),$("body").on("click","#btn_add_new_subcategorie",function(){s(),$("#btn_update_subcategorie_info").attr("id","btn_add_subcategorie"),$(".alert.alert-danger.subcategories").fadeOut(),$(".alert.alert-success.subcategories").fadeOut(),$(".alert.alert-warning.subcategories").fadeOut(),$(".alert.alert-danger.subcategories02").fadeOut(),$("#my_subcategories").fadeOut(),setTimeout(function(){$("#edit_add_update_subcategories").fadeIn()},400)}),$("body").on("click","#btn_add_new_product",function(){c(),$("#btn_update_product_info").attr("id","btn_add_product"),$(".alert.alert-danger.products").fadeOut(),$(".alert.alert-success.products").fadeOut(),$(".alert.alert-warning.products").fadeOut(),$(".alert.alert-danger.products02").fadeOut(),$("#images_upload").empty(),$("#my_products").fadeOut(),setTimeout(function(){$("#edit_add_update_products").fadeIn()},400)}),$("body").on("click","#btn_update_content",function(){var e=this,t=e.parentNode.parentNode,a=$(t).find("td:nth-child(2)").text();$("#input_content").val(a),$("#my_profile_section").css("display","block"),$("#my_contents").fadeOut(),$.ajax({url:"/get_content_body_info",type:"post",contentType:"application/json",data:JSON.stringify({content_description:a}),success:function(e){$("#summernote").summernote("code",""),$("#input_content_subtitle").val("");try{var t=e.data;$("#input_content_subtitle").val(t.subtitle),t&&$("#summernote").summernote("code",t.content_body)}catch(a){console.log("err")}setTimeout(function(){$("#edit_my_contents").fadeIn()},400)},error:function(e){console.log(e.responseJSON.message)}})}),$("body").on("click","#btn_update_content_body",function(){var e=$("#input_content").val(),t=$("#input_content_subtitle").val(),a=$("#summernote").summernote("code");$.ajax({url:"/update_content_body",type:"post",contentType:"application/json",data:JSON.stringify({content_description:e,content_body:a,subtitle:t}),success:function(e){console.log(e),$("#summernote").summernote("code",""),$("#input_content_subtitle").val(""),$(".alert.alert-success").fadeIn(),setTimeout(function(){$("#edit_my_contents").fadeOut(),$(".alert.alert-success").fadeOut(),setTimeout(function(){$("#my_contents").fadeIn()},400)},2e3)},error:function(e){alert(e.responseJSON.message)}})}),$("body").on("click","#pagination_products .pagination li a",function(){var e=$(this).attr("data-page");a(e)}),$("body").on("click","#variable_product",function(){var e=$('input[name="variable_product"]:checked').val();"with_variables"==e?($("#with_variables").fadeIn(),$("#no_variables").css("display","none")):($("#no_variables").fadeIn(),$("#with_variables").css("display","none"))}),$("body").on("click","#btn_add_variable",function(){$("#tbody_variable").append('<tr><td></td><td><input type="text" class="form-control c-square c-theme"/></td><td><input type="text" class="form-control c-square c-theme"/></td><td><a id="btn_remove_variable" href="javascript:;" class="btn c-theme-btn btn-xs" style="padding: 1px 3px 1px 8px;"><i class="fa fa-trash"></i></a></td></tr>'),d()}),$("body").on("click","#btn_remove_variable",function(){var e=this,t=e.parentNode.parentNode;$(t).remove(),d()}),$("body").on("change","#select_categorie_product",function(){$("#select_subcategorie_product").empty();var e=$(this).val();$.ajax({url:"/load_subcategories_by_categorieid",type:"post",contentType:"application/json",data:JSON.stringify({categorie_id:e}),success:function(e){var t=e.data;if(t){$("#select_subcategorie_product").append("<option></option>");for(var a=0;a<t.length;a++)$("#select_subcategorie_product").append('<option value="'+t[a]._id+'">'+t[a].name+"</option>")}},error:function(e){console.log(e.responseJSON.message)}})}),$("body").on("click",".btn_principalimage",function(){r(),$(this).find(".badge.badge-danger").css("background-color","#f6f92e")}),$("body").on("click","#btn_add_product",function(){$(".alert.alert-danger.products02").fadeOut(),$(".alert.alert-danger.products").fadeOut(),$(".alert.alert-warning.products").fadeOut(),$(".alert.alert-success.products").fadeOut(),$(".alert.alert-success.products02").fadeOut();var e=$("#input_product_name").val(),t=$("#input_product_code").val(),n=$("#input_product_price").val(),o=$("#input_product_stock").val(),s=$("#select_categorie_product").val(),i=$("#select_subcategorie_product").val(),r=$("#summernote03").summernote("code"),d=($("#tbody_variable").val(),[]);$("#images_upload").find(".col-md-3").each(function(){var e,t=$(this).find(".badge.badge-danger").css("background-color");e="rgb(246, 249, 46)"==t||"#f6f92e"==t?"principal":"";var a=$(this).find("#document_type").val(),n=$(this).find("#document_id").val(),o=$(this).find("#document_url").val(),s=$(this).find("#document_url_thumb").val();d.push({principal:e,document_type:a,document_id:n,document_url:o,document_url_thumb:s})});var u,l=[],p=$('input[name="variable_product"]:checked').val(),_="disable;";e&&t&&n&&s&&r?"with_variables"==p?(o=0,$("#tbody_variable").find("tr").each(function(){var e=$(this).find("td:nth-child(2) input").val(),t=$(this).find("td:nth-child(3) input").val();o=Number(t)+o,l.push({variable_name:e,variable_stock:t})}),u={name:e,code:t,price:n,stock:o,categorie_id:s,subcategorie_id:i,variables:l,content:r,image:d},console.log(u),_="enable"):"no_variables"==p?(u={name:e,code:t,price:n,stock:o,categorie_id:s,subcategorie_id:i,variables:[],content:r,image:d},console.log(u),_="enable"):_="disable":_="disable","enable"==_?$.ajax({url:"/register_new_product",type:"post",contentType:"application/json",data:JSON.stringify(u),success:function(e){c(),$(".alert.alert-success.products").fadeIn(),a(),setTimeout(function(){$(".alert.alert-success.products").fadeIn(),$("#edit_add_update_products").fadeOut(),setTimeout(function(){$("#my_products").fadeIn()},400)},2e3)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.products02").fadeIn()}}):$(".alert.alert-warning.products").fadeIn()}),$("body").on("click","#btn_update_product",function(){var e=$(this).attr("value");$("#input_product_selected").val(e),c(),$("#btn_update_product_info").attr("id","btn_add_product"),$(".alert.alert-danger.products").fadeOut(),$(".alert.alert-success.products").fadeOut(),$(".alert.alert-warning.products").fadeOut(),$(".alert.alert-danger.products02").fadeOut(),$("#my_products").fadeOut(),$.ajax({url:"/load_product_by_id",type:"post",contentType:"application/json",data:JSON.stringify({product_id:e}),success:function(e){console.log(e),setTimeout(function(){$("#edit_add_update_products").fadeIn()},400)},error:function(e){console.log(e.responseJSON.message),$(".alert.alert-danger.products02").fadeIn()}})}),$(document).ready(function(){e()})}();