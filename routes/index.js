var express = require('express');
var router 	= express.Router();

var mw   			= require('./mw');
var login  			= require('./login');
var user  			= require('./user');
var page  			= require('./page');
var categorie  		= require('./categorie');
var product 		= require('./product');

router.use(mw.appendCacheVar);


router.get('/', mw.obtieneSesion, mw.senduser, mw.index);
router.get('/login', mw.obtieneSesion, mw.senduser, mw.login)
router.get('/aboutus', mw.obtieneSesion, mw.senduser,  mw.aboutus)
router.get('/help', mw.obtieneSesion, mw.senduser,  mw.help)
router.get('/faq', mw.obtieneSesion, mw.senduser,  mw.faq)
router.get('/contactus', mw.obtieneSesion, mw.senduser,  mw.contactus)
router.get('/products', mw.obtieneSesion, mw.senduser,  mw.products)
router.get('/dashboard', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, mw.obtieneDatosUsuario, mw.dashboard);

router.post('/register_new_user', login.register_new_user)
router.post('/login', login.login)
router.get('/user/info', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.info);
router.post('/update_user_profile', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.update_user_profile);
router.post('/add_address', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.add_address);
router.post('/load_shippingaddress_by_user', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.load_shippingaddress_by_user);
router.post('/load_shippingaddress_info', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.load_shippingaddress_info);
router.post('/update_address', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, user.update_address);

router.post('/update_content_body', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, page.update_content_body);
router.post('/get_content_body_info', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, page.get_content_body_info);

router.post('/register_new_categorie', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.register_new_categorie);
router.post('/load_categories', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.load_categories);
router.post('/load_subcategories', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.load_subcategories);
router.post('/load_categories_by_id', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.load_categories_by_id);
router.post('/load_subcategories_by_id', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.load_subcategories_by_id);
router.post('/update_categorie', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.update_categorie);
router.post('/update_subcategorie', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.update_subcategorie);
router.post('/register_new_subsubcategorie', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.register_new_subsubcategorie);
router.post('/load_subcategories_by_categorieid', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, categorie.load_subcategories_by_categorieid);

router.post('/register_new_product', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, product.register_new_product);
router.post('/load_products', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, product.load_products);
router.post('/load_product_by_id', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, product.load_product_by_id);
router.post('/load_products_by_categorie_id', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, product.load_products_by_categorie_id);
router.post('/load_products_by_subcategorie_id', mw.obtieneSesion, mw.validaSesion, mw.validaEstadoUsuario, product.load_products_by_subcategorie_id);

router.get('/categorie/:id', mw.obtieneSesion, mw.senduser,  mw.load_categorie_page)
router.get('/subcategorie/:id', mw.obtieneSesion, mw.senduser,  mw.load_subcategorie_page)
router.get('/view_product/:id', mw.obtieneSesion, mw.senduser,  mw.load_product_page)



module.exports = router;