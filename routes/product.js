const express = require('express');

module.exports = function(app) {
    var product = require('../controllers/product');
    var verifyToken = require('../controllers/verifyToken');

    app.route('/products/all')
        .get(verifyToken.verify_token, product.all_products);

    app.route('/products/add')
        .post(verifyToken.verify_token, product.add_product);

    app.route('/products/:id')
        .get(verifyToken.verify_token, product.find_product);
}