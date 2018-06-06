<?php 

if ( $_SERVER [ 'REQUEST_METHOD' ] == "POST" && $_SERVER [ "HTTP_ACCESS_TOKEN" ] === "1234" ) {
	
	# $_SERVER [ "HTTP_ACCESS_TOKEN" ]
	# $_SERVER [ "HTTP_ACCESS_USER" ]
	# $_SERVER [ "HTTP_ACCESS_PASSWORD" ]

	$data = json_decode ( $_POST [ "callcommunity" ], TRUE );

	if ( $data [ "action" ] == "login-email" ) {
		if ( $data [ "data" ] [ "email" ] == "admin@admin.com" ) {
			echo json_encode ( TRUE );
		} else{
			echo json_encode ( FALSE );
		};
	};

	if ( $data [ "action"] == "login" ) {
		$data [ "data" ] = array ( "email"=> $_SERVER [ "HTTP_ACCESS_USER" ], "password"=> $_SERVER [ "HTTP_ACCESS_PASSWORD" ] );
		if ( 
			$data [ "data" ] [ "email"] === "admin@admin.com" 
			&& $data [ "data" ] [ "password" ] === "d033e22ae348aeb5660fc2140aec35850c4da997" 
		) {
			echo json_encode ( TRUE );
		} else {
			echo json_encode ( FALSE );
		};
	};
	
	#var_dump ( $data );

};



