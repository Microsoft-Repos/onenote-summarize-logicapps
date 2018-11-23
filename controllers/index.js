var utilities = require('../libs/utilities');
var mongoClient = require("mongodb").MongoClient;

exports.index = function(req, res){

    var apikey = utilities.isValidSession(req);
    if(!apikey) {
        res.status(400).send('Unauthorized');
        return;
    }
    
    mongoClient.connect(utilities.getDBConnectionString(), function (err, client) {

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
            
            res.render('pages/index', {config: {apikey: apikey}, pages: result});

            return;
        });


    });
};