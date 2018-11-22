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
var bodyParser = require('body-parser')



app.get('/', function (req, res) {
    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }
    res.send("Hello world!")
});

var jsonParser = bodyParser.json();

app.post('/pages', jsonParser, function (req, res) {

    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }

    mongoClient.connect(process.env.APPSETTING_connectionStringPrimary, function (err, client) {

        if (err) {
            console.log(err);
            res.status(500).send("Application Error")
            return;
        };

        var dbo = client.db("onenotesummary");
        
        var data = req.body;
        if (utilities.tryParseJSON(data) !== false) data = JSON.parse(data);
        if (data == "") data = {};

        dbo.collection("pages").insertOne({id: uuidv4(), body: JSON.stringify(data)}, function(err, record){
            if (err) {
                console.log(err);
                res.status(500).send("Application Error")
                return;
            };

            console.log("Inserted record with id: " + record.insertedId);

            res.send("Saved");
            return;
        });

        
    }); 
    //console.log(req.body);
    //res.send(req.body);
});

app.get('/pages', function (req, res) {

    if(!utilities.isValidSession(req)) {
        res.status(400).send('Unauthorized');
        return;
    }

    mongoClient.connect(process.env.APPSETTING_connectionStringPrimary, function (err, client) {

        if (err) {
            console.log(err);
            res.status(500).send("Application Error")
            return;
        };

        var dbo = client.db("onenotesummary");
        var query = {};

        dbo.collection("pages").find(query).toArray(function(err, result) {
            
            client.close();
            
            if (err) {
                console.log(err);
                res.status(500).send("Application Error")
                return;
            };
            
            var responseArray = [];
            for (var i=0; i<result.length; i++){
                responseArray.push(JSON.parse(result[i].body));
            }

            res.send(responseArray)

            return;
        });


    });
    
});


var port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

