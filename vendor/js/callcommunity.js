function toggleClass ( $element, $class ) {
	document.querySelector ( $element ).classList.toggle ( $class );
};

function query ( $http = null, $uri = null , $fn = null, $fnError = null ) {
	$http
		.get ( $uri )
		.then ( function ( $response ) {
			if ( $fn ) {
				$fn ( $response.data );
			};
		}, function ( $error ) {
			if ( $fnError ) {
				$fnError ( $error );
			};
		} );
};

function cookieGet ( $cookies, $variable ) {
	var $get = $cookies.get ( $variable );
	$get = ( !$get ) ? [ ] : $get;
	return angular.fromJson ( $get );
};

function cookiePut ( $cookies, $variable, $value = null ) {
	$cookies.put ( $variable, angular.toJson ( $value ) );
	return true;
};

function cookieClearAll ( $cookies ) {
	console.log ( "Cookies Current" );
	console.log (  $cookies.getAll ( ) );
	angular.forEach ( $cookies.getAll ( ), function ( $v, $k ) {
		$cookies.remove ( $k );
	});

	console.log ( "Cookies Clear All" );
	console.log (  $cookies.getAll ( ) );
	console.log ( "Cookies End Clear" );
};

function modalToggle ( $time = 0 ) {
	setTimeout ( function ( ) {
		toggleClass ( ".modal", "active" );
	}, $time );
};

function upRead ( $scope = null ) {
	$scope.upRead = !$scope.upRead;
};