'use strict';

require("dotenv").config();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { MongoClient, ObjectID } = require('mongodb');

User = mongoose.model('User');


// normal user token verification
exports.verify_token = function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, process.env.KEY_SECRET, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      req.userId = decoded.id;
      next();
    });
}


// admin token verification
exports.verify_admin_token = function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, process.env.KEY_SECRET, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    User.findById(decoded.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      if(!user.isAdmin) {
        return res.status(403).send("Admin access denied!");
      }
    });

    req.userId = decoded.id;
    next();
  });
}