const express = require('express');

module.exports = function(app) {
    var user = require('../controllers/user');
    var verifyToken = require('../controllers/verifyToken');

    app.route('/register')
        .post(user.create_user);

    app.route('/login')
        .post(user.user_login);

    app.route('/me')
        .get(verifyToken.verify_token, user.get_user_id);

    // app.route('/api')
    //     .post(user.verifyTok, user.api_post);
}