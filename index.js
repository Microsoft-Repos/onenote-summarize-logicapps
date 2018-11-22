/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

var http = require('http');
var url = require('url');
var mongoClient = require("mongodb").MongoClient;

var server = http.createServer(function(request, response) {

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var apikey = query.apikey;

    if (apikey === undefined || process.env.APPSETTING_apikey === undefined || apikey != process.env.APPSETTING_apikey) {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.end("Unauthorized");
        return;
    }

    console.log(process.env.CUSTOMCONNSTR_CosmosDBPrimary);

    var textResult = {};
    mongoClient.connect(process.env.CUSTOMCONNSTR_CosmosDBPrimary, function (err, client) {

        if (err) {
            console.log(err);
            throw err;
        };

        var dbo = client.db("onenotesummary");
        var query = {};
        dbo.collection("pages").find(query).toArray(function(err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            console.log(result);
            textResult = result;
            client.close();

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("Hello World!<br>" + JSON.stringify(textResult));
        });
    });

    

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
