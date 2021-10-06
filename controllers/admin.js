'use strict';

var mongoose = require('mongoose');

Product = mongoose.model('Product');
User = mongoose.model('User');


// DELETE: admin: used to delete a product
exports.delete_product = async function(req, res) {
    try{
        const results = await Product.findByIdAndRemove(req.params.id);
        res.json('success');
    }catch{
        res.json('Error: could not delete product');
    }
}


// GET: send all the details to the admin dashboard
exports.dashboard = async function(req, res) {
    const all_products = await Product.find();
    const all_users = await User.find();

    const results = {
        all_products, 
        all_users
    }
    
    res.send(results)
}