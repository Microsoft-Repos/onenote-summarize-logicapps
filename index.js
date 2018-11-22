/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

var express = require('express')
var app = express();
var utilities = require('./utilities.js');
var mongoClient = require("mongodb").MongoClient;
const uuidv4 = require('uuid/v4');



app.get('/', function (req, res) {
    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }
    res.send("Hello world!")
});

app.get('/save', function (req, res) {
    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }

    console.log(req);

    /* mongoClient.connect(process.env.APPSETTING_connectionStringPrimary, function (err, client) {

        if (err) {
            console.log(err);
            throw err;
        };

        var dbo = client.db("onenotesummary");
        var query = {};

        if (utilities.tryParseJSON(data) !== false) data = JSON.parse(data);
        if (data == "") data = {};
        

        dbo.collection("pages").insertOne({id: uuidv4(), body: JSON.stringify(data)}, function(err, record){
            if (err) {
                console.log(err);
                throw err
            };
            console.log("Inserted record with id: " + record.insertedId);

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("");
        });

        dbo.collection("pages").find(query).toArray(function(err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            console.log(result);
            client.close();

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(JSON.stringify(data));
        });
    }); */

    res.send(req.body);
});

app.get('/list', function (req, res) {
    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }

    mongoClient.connect(process.env.APPSETTING_connectionStringPrimary, function (err, client) {

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
            client.close();

            res.send(data)

        });
    });
    
});


var port = process.env.PORT || 1338;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

