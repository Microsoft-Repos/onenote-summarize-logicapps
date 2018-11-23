var express = require('express');
var pages = require('../controllers/pages');
var bodyParser = require('body-parser');
var router = express.Router();

// Parsers
var jsonParser = bodyParser.json();

// Routes
router.get('/page/:id', pages.pageGet);
router.post('/pages', jsonParser, pages.pagePost);
router.get('/pages', pages.pagesGet);

module.exports = router;