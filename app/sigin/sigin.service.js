( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "$siginservice", [ "$http", "$timeout", SigInService ] );

	function SigInService ( $http, $timeout ) {
		var $sigInService = this;
		$sigInService.uri = "app/sigin/sigin.service.php";
		$sigInService.token = "1010";
		$sigInService.sender = sender;

		function sender ( $data = null, $callback = null ) {
			query ( $data, $callback, $data.password );
		};

		function query ( $data = null, $callback = null, $password = "" ) {
			if ( null !== $data && null !== $callback ) {
				delete $data.password;
				console.log ( $data );
	            $http ( {
	                url: $sigInService.uri,
	                method: "POST",
	                data: String ( "siginservice="+JSON.stringify ( $data ) ),
	                headers : { 
		                'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
		                'Access-Control-Allow-Origin' : '*',
		                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
		                'Access-Token': $sigInService.token,
		                'Authentication': $password,
	            	},
	            } )
	            .then ( 
	            	function ( $data ) { $timeout ( function ( ) { console.log ( $data.data );$callback ( $data.data ); }, 1000 ); }
	            	, function ( $error ) { $callback ( $error ); } 
	            );
        	};
        };
	};

} ) ( );