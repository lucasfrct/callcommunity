var $TokenAplication = sha1 ( "1010" );

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

function encripty ( $string = "" ) {
    return String ( sha3_512 ( base64Encode ( md5 ( sha1 ( String ( $string ).trim ( ) ) ) ) ) );
};