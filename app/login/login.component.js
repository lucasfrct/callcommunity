( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.component ( "loginView", LoginView ( ) );

	function LoginView ( ) {
		return {
			templateUrl: "app/login/login.html",
			controller: [ "$scope", "$timeout", "$loginservice", logincontroller ],
		};
	};
	
	function logincontroller ( $scope, $timeout, $loginservice ) {
		$scope.showPassword = showPassword;
		$scope.recoverPassword = recoverPassword;
		$scope.next = next;
		
		$scope.input = {
			type: true,
			error: false,
			shake: false,
			load: false,
			data: "",
			authorized: false,
		};

		$scope.login = {
			user: "",
			email: "admin@domain.com",
		};

		function showPassword ( ) {
			$scope.input.type = !$scope.input.type;
		};

		function recoverPassword ( $data ) {
			console.log ( "recover password" );
		};

		function next ( $data ) {
			if ( !$scope.login.email && $data  ) { checkEmail ( $data ); };
			if ( $scope.login.email ) { checkPassword ( $data ); };
		};

		function checkEmail ( $data ) {
			$scope.input.load = true;
			$loginservice.email ( $data, function ( $data ) {
				$scope.input.load = false;
				if ( $data [ 0 ] !== false  ) {
					setSuccess ( );
					$scope.login.user = $data.user;
					$scope.login.email = $data.email;

				} else {
					setError ( );
				};
			} );
		};

		function checkPassword ( $data ) {
			$loginservice.password ( $scope.login.email, $data, function ( $data ) { 
				$scope.input.load = false;
				if ( $data [ 0 ] != false ) {
					setSuccess ( );
					$scope.input.authorized = true;
				} else {
					setError ( );
					$scope.input.data = "";
				};

			} );
		};

		function setSuccess ( ) {
			$scope.input.error = false;
			$scope.input.data = "";
		}
		function setError ( ) {
			$scope.input.error = true;
			$scope.input.shake = true;
			$timeout ( function ( ) { $scope.input.shake = false }, 1000 );
		};
	};
} ) ( );