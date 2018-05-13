<?php 

#include ( "lib/crud/Service.php" );

$query = [ "action"=> "read", "table"=> "tasks", "fields"=> "*", "condition"=> array ( "dated"=> "2018-5-12", "hour"=> "8:00" ) ];
$url = "http://callcommunity/lib/crud/Service.php";

#echo sendJson ( $url, parseArrayToJson ( $query ) );
$q = "callcommunity=".parseArrayToJson ( $query );

#echo $q;

function parseArrayToJson ( array $data = null ) {
	return json_encode ( $data );
};


