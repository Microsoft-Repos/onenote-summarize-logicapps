/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var apikey = req.query.apikey;

    console.log(process.env);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!: " + apikey + " " + process.env.APPSETTING_apikey);

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
