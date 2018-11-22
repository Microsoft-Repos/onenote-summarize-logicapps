/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

var http = require('http');
var url = require('url');
var mongoClient = require("mongodb").MongoClient;
const uuidv4 = require('uuid/v4');

var server = http.createServer(function(request, response) {

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var apikey = query.apikey;

    if (apikey === undefined || process.env.APPSETTING_apikey === undefined || apikey != process.env.APPSETTING_apikey) {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.end("Unauthorized");
        return;
    }

    var data = '';
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
    request.on('end', function() {
        
        //console.log(data);

        mongoClient.connect(process.env.APPSETTING_connectionStringPrimary, function (err, client) {

            if (err) {
                console.log(err);
                throw err;
            };
    
            var dbo = client.db("onenotesummary");
            var query = {};

            if (tryParseJSON(data) !== false) data = JSON.parse(data);
            if (data == "") data = {};
            

            dbo.collection("pages").insertOne({id: uuidv4(), body: data}, function(err, record){
                if (err) {
                    console.log(err);
                    throw err
                };
                console.log("Inserted record with id: " + record.insertedId);

                response.writeHead(200, {"Content-Type": "text/plain"});
                response.end("");
            });

            /*dbo.collection("pages").find(query).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                console.log(result);
                client.close();
    
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.end(JSON.stringify(data));
            });*/
        });

    });


    

});


function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
