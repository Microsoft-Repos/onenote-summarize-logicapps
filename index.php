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


print_r(json_decode(file_get_contents('php://input')));
exit;