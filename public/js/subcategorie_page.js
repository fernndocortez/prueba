!function(){function t(){var t=window.location.pathname.split("/")[2];$.ajax({url:"/load_subcategories_by_id",type:"post",contentType:"application/json",data:JSON.stringify({subcategorie_id:t}),success:function(t){setTimeout(function(){$("#edit_add_update_subcategories").fadeIn()},400);var c=t.data,e=(c.categorie_id,c.name),o=(c.description,c.content);document.title="Butterfly | "+e,$("#subcategorie_name").text("Sub Categoría - "+e),$("#subcategorie_content").html(o+"<br><br><br>")},error:function(t){console.log(t.responseJSON.message)}})}function c(t){var c=window.location.pathname.split("/")[2];$.ajax({url:"/load_products_by_subcategorie_id",type:"post",contentType:"application/json",data:JSON.stringify({page:t,subcategorie_id:c}),success:function(t){console.log(t),$("#product_list").empty();for(var c=t.data,e=0,o=0,r=t.objpagination,i=0;i<c.length;i++){var a=c[i]._id,n=c[i].name,s=(c[i].code,c[i].price),d=(c[i].stock,c[i].categorie_id,c[i].subcategorie_id,c[i].image),l=get_principal_image(d),p="";try{p=l.document_url?l.document_url:""}catch(b){p=""}e++;var u=e%4;0==i&&(o++,$("#product_list").append('<div class="row"><div class="row_'+o+'"></div></div>')),0==u&&(o++,$("#product_list").append('<div class="row"><div class="row_'+o+'"></div></div>')),0!=i&&1!=i&&2!=i&&3!=i||$("#product_list").find(".row_1").append('<div class="col-md-3 col-sm-6 c-margin-b-20"><div class="c-content-product-2 c-bg-white c-border"><div class="c-content-overlay"><!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>--><div class="c-overlay-wrapper"><div class="c-overlay-content"><a href="/view_product/'+a+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div></div><div data-height="height" style="height: 230px; background-image: url('+p+');" class="c-bg-img-center c-overlay-object"></div></div><div class="c-info"><p class="c-title c-font-16 c-font-slim">'+n+'</p><p class="c-price c-font-14 c-font-slim">S/. '+s+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>--></div><div role="group" class="btn-group btn-group-justified"><div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div><div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div></div></div></div>'),4!=i&&5!=i&&6!=i&&7!=i||$("#product_list").find(".row_2").append('<div class="col-md-3 col-sm-6 c-margin-b-20"><div class="c-content-product-2 c-bg-white c-border"><div class="c-content-overlay"><!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>--><div class="c-overlay-wrapper"><div class="c-overlay-content"><a href="/view_product/'+a+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div></div><div data-height="height" style="height: 230px; background-image: url('+p+');" class="c-bg-img-center c-overlay-object"></div></div><div class="c-info"><p class="c-title c-font-16 c-font-slim">'+n+'</p><p class="c-price c-font-14 c-font-slim">S/. '+s+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>--></div><div role="group" class="btn-group btn-group-justified"><div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div><div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div></div></div></div>'),8!=i&&9!=i&&10!=i&&11!=i||$("#product_list").find(".row_3").append('<div class="col-md-3 col-sm-6 c-margin-b-20"><div class="c-content-product-2 c-bg-white c-border"><div class="c-content-overlay"><!--<div class="c-label c-bg-red c-font-uppercase c-font-white c-font-13 c-font-bold">Sale</div>--><div class="c-overlay-wrapper"><div class="c-overlay-content"><a href="/view_product/'+a+'" class="btn btn-md c-btn-grey-1 c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square">Visualizar</a></div></div><div data-height="height" style="height: 230px; background-image: url('+p+');" class="c-bg-img-center c-overlay-object"></div></div><div class="c-info"><p class="c-title c-font-16 c-font-slim">'+n+'</p><p class="c-price c-font-14 c-font-slim">S/. '+s+'  <!--<span class="c-font-14 c-font-line-through c-font-red">$600</span></p>--></div><div role="group" class="btn-group btn-group-justified"><div role="group" class="btn-group c-border-top"><a href="shop-product-wishlist.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Favorito</a></div><div role="group" class="btn-group c-border-left c-border-top"><a href="shop-cart.html" class="btn btn-sm c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product">Carrito</a></div></div></div></div>')}var v=JST.pagination({pagination:r});$("#pagination_products").html(v)},error:function(t){console.log(t.responseJSON.message)}})}$(document).ready(function(){load_categories(),t(),c()})}();