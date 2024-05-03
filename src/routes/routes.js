const express = require('express');
const router = express.Router();
//
const routesController = require('../controller/routesController');

router
    // Get de rutas
    .get('/', routesController.getIndex)
    .get('/login', routesController.getLogin)
    .get('/signup', routesController.getSignup)

module.exports = router;