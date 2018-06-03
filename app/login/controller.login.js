( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "login", [ "$scope", "$location", "servicelogin", ControllerLogin ] );

	function ControllerLogin ( $scope, $location, $servicelogin ) {
	
		$scope.login = {
			staus: false,
			valid: false,
			class: "",
			email: "",
			password: "",
			info: "Iniciar sessão",
			btn: "Seguinte",
		};

		$scope.metaLogin = {
			email: "a@a.com",
			password: "aaa",
		};

		$servicelogin.queryEmail ( { email: "lucas", password: "pass" }, function ( $data ) {
			console.log ( "query email" );
			console.log ( $data );
		} );

		$scope.submitLogin = function ( ) {

			if ( validEmail ( $scope.login.email ) ) {
				
				$scope.login.valid = true;
				$scope.login.class = "";
				$scope.login.info = "Introduza a senha";
				$scope.login.btn = "Iniciar sessão";

			} else if ( !validEmail ( $email = "" ) ){
				
				$scope.login.valid = false;
				$scope.login.class = "invalid";
				$scope.login.info = "E-mail inválido";
				$scope.login.btn = "Seguinte";

			};

			if ( $scope.login.valid && $scope.login.password.length >= 1 && validPass ( $scope.login.password ) ) {

				$scope.login.valid = true;
				$scope.login.class = "";

				if ( validPass ( $scope.login.password ) && validEmail ( $scope.login.email ) ) {
					$scope.login.info = "Iniciando sessão";
					$location.path ( "/tasks" );
				};

			} else if ( $scope.login.valid && $scope.login.password.length >= 1 && !validPass ( $scope.login.password ) ) {
				
				$scope.login.valid = true;
				$scope.login.class = "invalid";
				$scope.login.info = "Senha inválida";

			};
		};

		function validEmail ( $email = "" ) {
			return ( JSON.stringify ( $email ) == JSON.stringify ($scope.metaLogin.email ) ) ? true : false;
		} 

		function validPass ( $password = "" ) {
			return ( JSON.stringify ( $password ) == JSON.stringify ( $scope.metaLogin.password ) ) ? true : false;
		};
	};

} ) ( );
