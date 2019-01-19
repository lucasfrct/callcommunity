( function ( ) { 
    "use strict";

	angular
        .module ( "callcommunity" )
        .service ( "$taskservice", [ "$http", "$timeout", TaskService ] );
	
	function TaskService ( $http, $timeout ) {

		var $taskService = this;
		
		$taskService.token = "1010";

		$taskService.uri = "app/login/login.service.php";

		
		function query ( $data = null, $callback = null, $password = "" ) {
			if ( null !== $data && null !== $callback ) {
				console.log ( $password  );
	            $http ( {
	                url: $taskService.uri,
	                method: "POST",
	                data: String ( "loginservice="+JSON.stringify ( $data ) ),
	                headers : { 
		                'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
		                'Access-Control-Allow-Origin' : '*',
		                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
		                'Access-Token': $taskService.token,
		                'Authentication': $password,
	            	},
	            } )
	            .then ( 
	            	function ( $data ) { $timeout ( function ( ) { $callback ( $data.data ); }, 1000 ); }
	            	, function ( $error ) { $callback ( $error ); } 
	            );
        	};
        };
	};

} ) ( );