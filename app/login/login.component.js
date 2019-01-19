( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.component ( "loginView", LoginView ( ) );

	function LoginView ( ) {
		return {
			templateUrl: "app/login/login.html",
			controller: [ "$scope", "$session", "$timeout", "$loginservice", logincontroller ],
		};
	};
	
	function logincontroller ( $scope, $session, $timeout, $loginservice ) {
		$scope.showPassword = showPassword;
		$scope.recoveryPassword = recoveryPassword;
		$scope.next = next;
		
		$scope.input = {
			type: true,
			error: false,
			shake: false,
			load: false,
			data: "",
			authorized: false,
			reset: false,
		};

		$scope.login = {
			user: "",
			email: "",
		};

		function showPassword ( ) {
			$scope.input.type = !$scope.input.type;
		};

		function recoveryPassword ( $data ) {
			$scope.input.reset = true;
			$scope.login.user = "Utilize o email registrado para criar uma nova senha.";
		};

		function next ( $data ) {
			if ( $scope.input.reset == true ) {
				resetPassword ( $data );
			} else {
				if ( !$scope.login.email && $data  ) { checkEmail ( $data ); };
				if ( $scope.login.email ) { checkPassword ( $data ); };
			};
		};

		function resetPassword ( $data ) {
			$scope.input.load = true;
			$loginservice.reset ( $data, function ( $data ) { 
				$scope.input.load = false;
				if ( $data [ 0 ] !== false  ) {
					setSuccess ( );
					$scope.input.authorized = true;
				} else {
					setError ( );
				};
			} );
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
					$timeout ( function ( ) { 
						$session.set ( $data.session, ( 0.017 * 5 ) ); // 2 houras
						$session.redirect ( "/task.html" );
					}, 900 );

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

		//$session.set ( "1010", 0.017 );
		//console.log ( $session.get ( ) );
		//$session.kill ( );
	};
} ) ( );