var express = require('express');
var pages = require('../controllers/pages');
var bodyParser = require('body-parser');
var router = express.Router();

// Parsers
var jsonParser = bodyParser.json();

// Routes
app.get('/page/:id', pages.pageGet);
app.post('/pages', jsonParser, pages.pagePost);
app.get('/pages', pages.pagesGet);

module.exports = router;