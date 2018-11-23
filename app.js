/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

var express = require('express')
var routes= require('./routes');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/', routes);

// export app to module
module.exports = app;

// listen to the server port
var port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

