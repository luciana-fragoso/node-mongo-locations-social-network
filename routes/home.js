const router = require('express').Router();

const homeController = require ('../controller/home');
const locationController = require ('../controller/locations');
const userController = require ('../controller/user');

router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);
router.get('/userPage/:id',homeController.userPage);

router.post("/changePassword",userController.changePassword);

router.get('/location/:id',locationController.seeLocation);
router.get('/newLocation',locationController.newLocation);
router.get('/searchLocation/:searchInput',locationController.searchLocation);

router.post('/newLocation',locationController.newLocationPost);
router.post('/newComment',locationController.newComment);
router.post('/like',locationController.newLike);
router.post('/dislike',locationController.newDislike);

router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.get("/logout",userController.logout);
//ROUTE
module.exports = router;
