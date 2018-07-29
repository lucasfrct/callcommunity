<?php 

include ( "Authenticate.php" );

$TokenAplication = sha1 ( "1010" );

if ( $_SERVER [ 'REQUEST_METHOD' ] == "POST" && !empty ( $_SERVER [ "HTTP_ACCESS_TOKEN" ] ) ) {

	$response = false;

	$data = json_decode ( $_POST [ "callcommunity" ], TRUE );

	if ( $data [ "action" ] === "login-check-email" ) {
		$author = new Authenticate;
		$author->setToken ( $TokenAplication );
		$author->setUser ( "admin@admin.com" );
		$response = $author->checkUser ( );
	};


	if ( $data [ "action" ] === "login-check-password" ) {
		$author = new Authenticate;
		$author->setToken ( $TokenAplication );
		$author->setUser ( "admin@admin.com" );
		$author->setPassword ( "admin1010" );
		$response = $author->access ( );
	};

	if ( $data [ "action" ] === "login-reset" ) {
		$author = new Authenticate;
		$author->setToken ( $TokenAplication );
		$author->setUser ( "admin@admin.com" );
		$response = $author->checkUser ( );
	};

	#echo json_encode ( $data );
	#echo json_encode ( $_SERVER );

	echo json_encode ( $response );

};
