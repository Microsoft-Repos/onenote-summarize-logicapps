var express = require('express');
var pages = require('../controllers/pages');
var bodyParser = require('body-parser');
var router = express.Router();

// Parsers
var jsonParser = bodyParser.json();

// Routes
router.get('/:id', pages.pageGet);
router.post('/', jsonParser, pages.pagePost);
router.get('/', pages.pagesGet);

module.exports = router;