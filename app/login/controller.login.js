( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "login", [ "$scope", "$location", "servicelogin", "$timeout", "$window", ControllerLogin ] );

	function ControllerLogin ( $scope, $location, $servicelogin, $timeout, $window ) {
		$scope.login = {
			status: false,
			load: false,
			cache: { email: "", login: "" },
			email: "",
			password: "",
			messages: [ 
				"", 
				"Iniciar sessão", 
				"E-mail inválido", 
				"Intoduza a senha", 
				"Senha inválida", 
				"Seginte", 
				"Login em progessão", 
				"Iniciando a sessão",
			],
			info: "",
			action: "",
		};

		$scope.login.info = $scope.login.messages [ 1 ];
		$scope.login.action = $scope.login.messages [ 5 ];

		$scope.submitLogin = function ( ) {
			
			$scope.login.load = true;

			if ( !$scope.login.status && !$scope.login.cache.email ) {

				$servicelogin.queryEmail ( $scope.login.email , function ( $status ) {
					
					$scope.login.load = false;

					if ( "true" == $status ) {
						$scope.login.cache.email = $scope.login.email;
						$scope.login.info = $scope.login.messages [ 3 ];
						$scope.login.action = $scope.login.messages [ 1 ];

						inputValid ( ".login-email" );

					} else {
						$scope.login.info = $scope.login.messages [ 2 ];
						$scope.login.cache.email = "";

						inputInvalid ( ".login-email" );
					};
				} );
			};

			if ( !$scope.login.status && $scope.login.cache.email ) {

				$scope.login.cache.password = $scope.login.password;

				$servicelogin.queryPassword ( $scope.login.cache.email, sha1 ( $scope.login.cache.password.trim ( ) ), function ( $status ) {
					
					$scope.login.load = false;
					
					if ( "true" == $status ) {
						$scope.login.status = true;
						$scope.login.info = $scope.login.messages [ 7 ]
						$scope.login.action = $scope.login.messages [ 0 ];

						inputValid ( ".login-password" );

						$scope.login.load = true;
						
						$timeout ( function ( ) {
							$scope.login.load = false;
							$location.path ( "/tasks" );
						}, 1000 );

					} else {
						$scope.login.info = $scope.login.messages [ 4 ];;
						$scope.login.status = false;
						$scope.login.password = "";
						$scope.login.cache.password = "";
						
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
		}, 900 );
	};

	function inputValid ( $element ) {
		removeClass ( $element, "invalid" );
		removeClass ( $element, "error" );
	};

} ) ( );
