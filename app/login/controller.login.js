( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( 
			"login", 
			[ "$rootScope", "$scope", "$location", "servicelogin", "$timeout", "$interval", "$window", "$cookies", ControllerLogin ] 
		);

	function ControllerLogin ( $rootScope, $scope, $location, $servicelogin, $timeout, $interval, $window, $cookies ) {
		
		$scope.login = {
			status: false,
			load: false,
			reset: false,
			cache: { email: "", login: "" },
			email: "",
			password: "",
			messages: [ 
				"", //0                                                     
				"Iniciar sessão", //1 
				"Iniciando a sessão", //2
				"Intoduza a senha", //3
				"E-mail inválido", //4
				"Senha inválida", //5
				"Seginte",  //6
				"Enviar pedido", //7
				"Login em progressão", //8 
				"Não consegue aceder a conta?", //9
				"Recuperação de senha:", //10
				"Em instantes um link de recuperação será enviado para o email informado.", //11
				"Email de recuperação:", //12
				"Criar conta", //13
			],
			info: "",
			action: "",
			rescue: "",
		};

		$scope.login.info = $scope.login.messages [ 1 ];
		$scope.login.action = $scope.login.messages [ 6 ];
		$scope.login.rescue  =$scope.login.messages [ 9 ];

		$scope.submitLogin = function ( ) {
			
			$scope.login.load = true;

			//Login-check-email
			if ( !$scope.login.status && !$scope.login.reset && !$scope.login.cache.email ) {

				$scope.login.rescue  =$scope.login.messages [ 9 ];

				$servicelogin.queryEmail ( $scope.login.email , function ( $status ) {
					
					$scope.login.load = false;

					if ( "true" === $status ) {
						$scope.login.cache.email = $scope.login.email;
						$scope.login.info = $scope.login.messages [ 3 ];
						$scope.login.action = $scope.login.messages [ 1 ];

						inputValid ( ".login-email" );

					} else {
						$scope.login.info = $scope.login.messages [ 4 ];
						$scope.login.cache.email = "";

						inputInvalid ( ".login-email" );
					};
				} );
			};

			if ( !$scope.login.status && !$scope.login.reset && $scope.login.cache.email ) {

				$scope.login.rescue  =$scope.login.messages [ 9 ];
				$scope.login.cache.password = $scope.login.password;

				$servicelogin.queryPassword ( $scope.login.cache.email, $scope.login.cache.password, function ( $status ) {

					$scope.login.load = false;
					
					if ( "true" === $status ) {
						
						$scope.login.status = true;
						$scope.login.info = $scope.login.messages [ 2 ]
						$scope.login.action = $scope.login.messages [ 0 ];

						inputValid ( ".login-password" );

						$scope.login.load = true;
						
						$timeout ( function ( ) {
							$scope.login.load = false;

							$rootScope.authenticateUser = $scope.login.cache;
							
							$location.path ( "/tasks" );

						}, 1000 );

					} else {
						
						$scope.login.info = $scope.login.messages [ 5 ];
						$scope.login.status = false;
						$scope.login.password = "";
						$scope.login.cache.password = "";
						$rootScope.athenticateUser = null;
						
						inputInvalid ( ".login-password" );

					};

				} );
			};

			if ( !$scope.login.status && $scope.login.reset ) {
				$servicelogin.reset ( $scope.login.email, function ( $data ) {

					$scope.login.load = false;

					if ( "true" === $data ) {
						
						$scope.login.status = true;
						$scope.login.cache.email = $scope.login.email;
						$scope.login.info = $scope.login.messages [ 12 ];
						$scope.login.rescue = $scope.login.messages [ 11 ];
						
						inputValid ( ".login-email" );

						$scope.login.info = 30;

						var $count = $interval ( function ( ) { 
							$scope.login.info = $scope.login.info - 1;

							if ( $scope.login.info <= 0 ) {
								$interval.cancel ( $count );
							};

						}, 1000 );

						$timeout ( function ( ) { 
							$location.path ( "/" );
						}, 30000 );

					} else {
						
						$scope.login.info  =$scope.login.messages [ 4 ];
						$scope.login.rescue  =$scope.login.messages [ 10 ];
						$scope.login.cache.email = "";
						
						inputInvalid ( ".login-email" );
					};

				}  );	
			};
		};

		$scope.resetPassword = function ( ) {
			$scope.login.reset = true;
			$scope.login.info = $scope.login.messages [ 10 ];
			$scope.login.action = $scope.login.messages [ 7 ];
			$scope.login.rescue  =$scope.login.messages [ 11 ];
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
