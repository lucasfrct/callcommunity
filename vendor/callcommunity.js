function toggleClass ( $element, $class ) {
	document.querySelector ( $element ).classList.toggle ( $class );
};

function query ( $http = null, $uri = null , $fn = null, $fnErr = null ) {

	$http.get ( $uri ).then ( function ( $response ) {
		if ( $fn ) {
			$fn ( $response.data );
		};
	}, function ( $error ) {
		if ( $fn ) {
			$fn ( $error );
		};

		if ( $fnErr ) {
			$fnErr ( $error );
		};

	} );

};