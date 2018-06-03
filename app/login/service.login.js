( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "servicelogin", [ "$http", ServiceLogin ] );
	
	function ServiceLogin ( $http ) {

		var $login = this;

		var $uri = "app/login/login.php";

		$login.queryEmail = queryEmail;

		function queryEmail ( $login = null, $fn = null ) {
		
			var $loginEmail = { 
				action: "login", 
				table: "user",
				data: {
					email: $login.email,
				}
			};

			query ( $loginEmail, $fn );
		};

		function queryPassword ( $login = null, $fn = null ) {
		
			var $loginPassword = { 
				action: "login", 
				table: "user",
				data: {
					email: $login.email,
					password: $login.password,
				}
			};

			query ( $loginPassword, $fn );
		};

		function query ( $query = null, $fn = null ) {
			$http ( {
				url: $uri,
				method: "POST",
				data: "callcommunity="+JSON.stringify ( $query ),
				headers : { 
					'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				},
				responseType: 'text',
			} )
			.then ( function ( $data ) {
				if ( null !== $fn ) {
					$data = $data.data;
					if ( angular.isArray ( $data ) ) {
						$data = $data.map ( function ( $item, $index ) { 
							$item.index = $index;
							return $item;
						} );
					};

					$fn ( $data );
				};
			}, function ( $error ) {
				$fn ( $error );
			} );
		};
	};

} ) ( );