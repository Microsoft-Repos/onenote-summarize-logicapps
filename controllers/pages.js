var utilities = require('../libs/utilities');
var mongoClient = require("mongodb").MongoClient;

exports.pageGet = function(req, res){
    var apikey = utilities.isValidSession(req);
    if(!apikey) {
        res.status(400).send('Unauthorized');
        return;
    }
    
    var id= req.params.id;

    mongoClient.connect(utilities.getDBConnectionString(), function (err, client) {

        if (err) {
            console.log(err);
            res.status(500).send("Application Error")
            return;
        };

        var dbo = client.db("onenotesummary");
        var query = {id: id};

        dbo.collection("pages").find(query).toArray(function(err, result) {
            
            client.close();
            
            if (err) {
                console.log(err);
                res.status(500).send("Application Error")
                return;
            };
            
            res.render('pages/page', {config: {apikey: apikey}, content: result[0].body.body});

            return;
        });


    });
};

exports.pagePost = function(req, res){
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
        if (data == "") {
            console.log(err);
            res.status(500).send("Application Error")
            return;
        }

        var queryNotebooks = {
            id: data.section.parentNotebook.id
        };

        var querySectionGroups = {
            id: data.section.parentSectionGroup.id
        };

        var querySections = {
            id: data.section.id
        };

        var queryPages = {
            id: data.page.id
        };

        var dataNotebooks = data.section.parentNotebook;
        var dataSectionGroups = data.section.parentSectionGroup;
        var dataSection = data.section;

        var dataPages = {
            id: data.page.id, 
            sectionId:data.section.id,
            sectionGroupId:data.section.parentSectionGroup.id,
            notebookId:data.section.parentNotebook.id,
            body: data.body,
            page: data.page,
            section: data.section
        };

        // Insert page
        dbo.collection("pages").update(
            queryPages,
            dataPages,
            {
              upsert: true,
            },
            function(err, record){
                if (err) {
                    console.log(err);
                    res.status(500).send("Application Error")
                    return;
                };
                
                console.log("Inserted/updated pages record with id: " + queryPages.id);

                // Insert section
                dbo.collection("sections").update(
                    querySections,
                    dataSection,
                    {
                      upsert: true,
                    },
                    function(err, record){
                        if (err) {
                            console.log(err);
                            res.status(500).send("Application Error")
                            return;
                        };
            
                        console.log("Inserted/updated sections record with id: " + querySections.id);
            
                        // Insert notebook
                        dbo.collection("notebooks").update(
                            queryNotebooks,
                            dataNotebooks,
                            {
                              upsert: true,
                            },
                            function(err, record){
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Application Error")
                                    return;
                                };
                                
                                console.log("Inserted/updated notebooks record with id: " + queryNotebooks.id);
                    
                                // Insert section group
                                if(querySectionGroups.id != ""){
                                    dbo.collection("sectionGroups").update(
                                        querySectionGroups,
                                        dataSectionGroups,
                                        {
                                          upsert: true,
                                        },
                                        function(err, record){
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send("Application Error")
                                                return;
                                            };
                                
                                            console.log("Inserted/updated sectionGroups record with id: " + querySectionGroups.id);
                                
                                            res.send("Saved");
                                            return;
                                        }
                                    );
                                }else{
                                    res.send("Saved");
                                    return;
                                }
                                
                            }
                        );
                    }
                );
    
            }
        );
        
    }); 
};

exports.pagesGet = function(req, res){
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
            
            res.send(result)

            return;
        });


    });
};