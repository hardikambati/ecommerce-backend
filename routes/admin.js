const express = require('express');

module.exports = function(app) {
    var admin = require('../controllers/admin');
    var verifyToken = require('../controllers/verifyToken');

    app.route('/admin/delete/:id')
        .delete(verifyToken.verify_admin_token, admin.delete_product)

    app.route('/admin/dashboard')
        .get(verifyToken.verify_admin_token, admin.dashboard)
}