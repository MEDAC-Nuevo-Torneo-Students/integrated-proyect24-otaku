const express = require('express');
const router = express.Router();
//
const routesController = require('../controller/routesController');
const loginController = require('../controller/loginController');

router
    // Get de rutas
    .get('/', routesController.getIndex)
    .get('/login', routesController.getLogin)
    .get('/signup', routesController.getSignup)
    .get('/shop', routesController.getShop)
    .get('/cart', routesController.getCart)
    .get('/product', routesController.getProduct)

    // Post de rutas
    .post('/register', loginController.postRegister)
    .post('/login', loginController.postLogin)

    
    

module.exports = router;