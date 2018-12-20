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

function uniqueArray ( $origArr ) {
    var $newArr = [ ];
    var $origLen = $origArr.length;
    var $found;
    var $x;
    var $y;

    for ( $x = 0; $x < $origLen; $x++ ) {
        
        $found = undefined;
        
        for ( $y = 0; $y < $newArr.length; $y++ ) {
            if ( $origArr [ $x ].id == $newArr [ $y ].id ) {
                $found = true;
                break;
            };
        };

        if ( !$found ) {
            $newArr.push ( $origArr [ $x ] );
        };
    };

    return $newArr;
};