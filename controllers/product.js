'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

Product = mongoose.model('Product');


// GET: returns all the products
exports.all_products = async function(req, res) {
    try{
        const results = await Product.find();
        res.json(results);
    }catch{
        res.json('failure');
    }
}


// POST: add's a new product
exports.add_product = async function(req, res) {
    jwt.verify(req.headers['x-access-token'], process.env.KEY_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, async function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            const product = new Product({
                posted_by: user.email,
                name: req.body.name, 
                cost: req.body.cost, 
                description: req.body.description, 
                offer: req.body.offer
            })

            try{
                const data = await product.save();
                res.send('success');
            }catch(err) {
                res.send('Could not add product')
            }
        });
    });

}


// GET: returns a single product based on ID
exports.find_product = async function(req, res) {
    try{
        const query = await Product.findById(req.params.id);
        res.json(query);
    }catch(err) {
        res.send('Error: could not find product')
    }
}

