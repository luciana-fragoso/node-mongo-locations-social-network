const router = require('express').Router();

const homeController = require ('../controller/home');
const locationController = require ('../controller/locations');

router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);
router.get('/myProfile',homeController.myProfile);
router.get('/logout',homeController.logout);

router.get('/seeLocation/:id',locationController.seeLocation);
router.get('/newLocation',locationController.newLocation);
router.get('/searchLocation/:searchInput',locationController.searchLocation);

router.post('/newLocation',locationController.newLocationPost);
//ROUTE
module.exports = router;
