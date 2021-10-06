const express = require('express')
      app = express(),
      port = 8000,
      mongoose = require('mongoose'),
      Product = require('./models/product'),
      User = require('./models/user'),
      bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ecommerce');

// cross origin resource sharing
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
var route1 = require('./routes/product');
var route2 = require('./routes/admin');
var route3 = require('./routes/user');

route1(app);
route2(app);
route3(app);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url : req.originalUrl + 'not found'})
})