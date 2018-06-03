<?php 

$email = "lucasfrct@gmail.com";
$password = "lucas";

if ( $_SERVER [ 'REQUEST_METHOD' ] == "POST" ) {

	$data = json_decode ( $_POST [ "callcommunity" ] );

	$action = $data->{ "action" };
	$table = $data->{ "table" };
	$email = $data->{ "data" }->{ "email" };
	$password = ( iseet ( $data->{ "data" }->{ "password" } ) ) ? $data->{ "data" }->{ "password" } : NULL ;


	print_r ( $email );

	//echo json_encode ( $data );
};