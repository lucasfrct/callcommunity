<?php 

$tokenAplication = sha1 ( "lucascosta" );
$loginEmail = "admin@admin.com";
$loginPassword = sha1 ( "admin" );

$checkToken = function ( $token ) use ( $tokenAplication ) {
	return ( $tokenAplication === $token ) ? TRUE : FALSE;
};

$checkEmail = function ( $email ) use ( $loginEmail ) {
	return ( $loginEmail === $email ) ? TRUE : FALSE;
};

$login = function ( $email, $password ) use ( $checkEmail, $loginPassword ) {
	return ( $checkEmail ( $email ) && $loginPassword === $password ) ? TRUE : FALSE;
};

if ( $_SERVER [ 'REQUEST_METHOD' ] == "POST" && $_SERVER [ "HTTP_ACCESS_TOKEN" ] === $tokenAplication ) {
	
	$data = json_decode ( $_POST [ "callcommunity" ], TRUE );

	if ( $data [ "action" ] == "check-email" ) {
		echo json_encode ( $checkEmail ( $data [ "data" ] [ "email" ] ) );
	};

	if ( $data [ "action"] == "login" ) {
		echo json_encode ( $login ( $_SERVER [ "HTTP_ACCESS_USER" ], $_SERVER [ "HTTP_ACCESS_PASSWORD" ] ) ); 
	};
};