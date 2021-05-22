const router = require('express').Router();

const homeController = require ('../controller/home');


router.get('/',homeController.homepage);


//ROUTE
module.exports = router;