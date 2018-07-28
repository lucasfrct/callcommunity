( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "sigin", [ "$scope", Sigin ] );

	function Sigin ( $scope ) {

		$scope.sigIn = {
			message: [
				"Criar uma nova conta",
			],
			load: false,
			disabled: __disabled,
			classPasswordConfirm: "error-password",
		} 

		$scope.user = {
			name: "",
            email: "",
			password: "",
		};

		function __disabled ( ) {
			var $status = true;
			var $comparePassword = checkIdentufyPassword ( );
			$status = ( 
				!( $scope.user.name.length >= 3 )
				|| !( String ( $scope.user.email ).indexOf( "@" ) >= 0 )
				|| !( $comparePassword )			
			) ? true : false;

			$scope.sigIn.classPasswordConfirm = ( !$scope.user.password && $comparePassword ) ? "" : "error-password";
			console.log ( $status  );
			
			return $status;
		};

		function checkIdentufyPassword ( ) {
			return $scope.user.password.length >= 8 && ( String ( $scope.passwordConfirm ) === String ( $scope.user.password ) );
		};

	};

} ) ( );