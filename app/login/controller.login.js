( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "login", [ "$scope", "$location", "servicelogin", "$timeout", "$window", ControllerLogin ] );

	function ControllerLogin ( $scope, $location, $servicelogin, $timeout, $window ) {
		$scope.login = {
			init: false,
			emailCache: "",
			email: "",
			password: "",
			info: "Iniciar sessão", // E-mail inválido // Iniciando sessão // Senha inválida //
			action: "Seguinte", // Iniciar sessão
			load: false,
		};

		$scope.submitLogin = function ( ) {
			if ( !$scope.login.emailCache && !$scope.login.init ) {

				$scope.login.load = true;
				
				$servicelogin.queryEmail ( $scope.login.email , function ( $status ) {
					
					$scope.login.load = false;

					if ( $status ) {
						$scope.login.emailCache = $scope.login.email;
						$scope.login.info = "Introduza a senha";
						$scope.login.action = "Iniciar sessão";

						inputValid ( ".login-email" );

					} else {
						$scope.login.info = "E-mail inválido";

						inputInvalid ( ".login-email" );
					};
				} );
			};

			if ( $scope.login.emailCache &&  !$scope.login.init ) {

				$scope.login.load = true;

				$servicelogin.queryPassword ( $scope.login.email, sha1 ( $scope.login.password.trim ( ) ), function ( $status ) {
					$scope.login.load = false;

					if ( $status ) {
						$scope.login.init = true;
						$scope.login.info = "";
						$scope.login.action = "Login em progresso";

						inputValid ( ".login-password" );

						$location.path ( "/tasks" );
					} else {
						$scope.login.info = "Senha inválida";
						
						inputInvalid ( ".login-password" );
					};
				} );
			};
		};
	};

	function inputInvalid ( $element ) {
		addClass ( $element, "invalid" );
		addClass ( $element, "error" );

		setTimeout ( function ( ) {
			removeClass ( $element, "invalid" );
		}, 830 );
	};

	function inputValid ( $element ) {
		removeClass ( $element, "invalid" );
		removeClass ( $element, "error" );
	};

} ) ( );
