var config = require('config');

exports.isValidSession = function(request) {
    //var url_parts = url.parse(request.url, true);
    //var query = url_parts.query;
    //var apikey = query.apikey;
    var apikey = request.query.apikey;
    var originalApiKey = process.env.APPSETTING_apikey || config.get('App.apikey');

    if (apikey === undefined || apikey != originalApiKey) {
        return false;
    }

    return apikey;
};

exports.tryParseJSON = function(jsonString) {
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

exports.getDBConnectionString = function() {

    if(process.env.APPSETTING_connectionStringPrimary && process.env.APPSETTING_connectionStringPrimary !== undefined) {
        return process.env.APPSETTING_connectionStringPrimary;
    }

    if (config.has('App.DbConnectionStringPrimary')) {
        return config.get('App.DbConnectionStringPrimary');
    }

    return false;
     
}
