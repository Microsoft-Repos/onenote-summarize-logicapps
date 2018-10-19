<?php


/* Vadim Zendejas

 * Project: OneNote Summarize
 * Engineer: Vadim Zendejas
 * Date: Oct, 2018 
*/

date_default_timezone_set('Europe/Berlin');

// Check for autorized API key
if (!isset($_GET['apikey']) || $_GET['apikey'] != getenv('APPSETTING_apikey')) {
    header('HTTP/1.1 401 Unauthorized', true, 401);
    exit( 'Not authorized' );
}

print "<pre>";
print "Headers: <br>";
print_r($_HEADERS);
print "Request: <br>";
print_r($_REQUEST);
print "Server: <br>";
print_r($_SERVER);
print "Post: <br>";
print_r($_POST);
print "</pre>";