'use strict';

require("dotenv").config();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

User = mongoose.model('User');


// POST: register a user
exports.create_user = async function(req, res) {
    const { full_name, email, password } = req.body;
    const already_user = await User.findOne({ email });
    
    if(already_user) {
        return res.send('Username already exists!')
    }

    // encrypt user password
    var hashedPassword = bcrypt.hashSync(password, 8);

    const user = await new User({
        full_name: full_name,
        email: email, 
        password: hashedPassword,
        isAdmin: false
    });
    user.save();

    var token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });

    res.send('success')
}


// GET: retrieve user id from token
exports.get_user_id = function(req, res) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.KEY_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
    User.findById(decoded.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
    });
    });
}


// POST: user login
exports.user_login = async function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.send({ auth: false, msg: 'Server Error' });
        if (!user) return res.send({ auth: false, msg: 'Invalid Credentials!' });
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.send({ auth: false, msg: 'Invalid Credentials!' });
        
        var token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token, isAdmin: user.isAdmin });
    });
}



// Authorization : Bearer <secret_key>
// exports.verifyTok = function verifyToken(req, res, next) {
//     const header = req.headers['authorization'];
//     if(typeof header !== 'undefined') {
//         const bearer = header.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         // return bearerToken;
//         next();
//     } else {
//         res.status(403).send("Forbidden Request");
//     }
// };

// exports.api_post = function(req, res) {
//     jwt.verify(req.token, 'secretKey', function(err, authData) {
//         if(err) {
//             res.status(403).send(err);
//         } else {
//             res.json({ message : 'Post Request...',
//             authData    
//         });
//         }
//     });
// };