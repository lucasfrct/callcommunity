( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "login", [ "$rootScope", "$scope", "$timeout", "$location", "servicelogin", ControllerLogin ] );

	function ControllerLogin ( $rootScope, $scope, $timeout, $location, $servicelogin ) {

		$scope.login = {
			status: false,
			load: false,
			emailCache: "",
			message: "Entrar",
			action: "Seguinte",
			info: "Não consegue aceder a conta?",
			errorEmail: false,
			invalidEmail: false,
			errorPassowrd: false,
			invalidPassword: false,
			statusInfo: false,
			msg: [
				"Entrar", //0
				"Seguinte", //1
				"Introduza a senha", //2
				"Iniciar sessão", //3
				"E-mail inválido", //4
				"Senha inválida", //5
				"Iniciando a sessão.", //6
				"Não consegue aceder a conta?", //7
				"Digite o email para recuperar a conta", //8
				"Recuperar", //9
				"Em instantes um link de recuperação será enviado para o email informado.", //10
			],
			next: __submit,
			reset: __reset,
		};

		$scope.user = {
			email: "",
			password: "",
		};

		__test ( );

		function __submit ( $user ) {

			//Set email
			if ( !$scope.login.statusInfo && !$scope.login.emailCache && $user.email && $user.email.indexOf ( "@" ) ) {

				$scope.login.load = true;

				$servicelogin.queryEmail ( $user.email, function ( $data ) {
					
					$scope.login.load = false;

					if ( $data == "true" ) {
						$scope.login.emailCache = $user.email;
						$scope.login.message = $scope.login.msg [ 2 ];
						$scope.login.action = $scope.login.msg [ 3 ];
						$scope.login.errorEmail = false;
						$scope.login.invalidEmail = false;
					} else {
						$scope.login.emailCache = "";
						$scope.login.message = $scope.login.msg [ 4 ];
						$scope.login.action = $scope.login.msg [ 1 ];
						$scope.login.errorEmail = true;
						$scope.login.invalidEmail = true;

						$timeout ( function ( ) { $scope.login.invalidEmail = false; }, 800 );
					};

				} );

			};

			//Set password
			if ( !$scope.login.statusInfo && $scope.login.emailCache && $user.email && $user.password.length >= 8 ) {
				
				$scope.login.load = true;

				$servicelogin.queryPassword ( $user.email, $user.password, function ( $data ) { 
					
					$scope.login.load = false;

					if ( $data == "true" ) {
						$scope.login.status = true;
						$scope.login.message = $scope.login.msg [ 6 ];
						$scope.login.errorPassowrd = false;
						$scope.login.invalidPassword = false;
						$rootScope.authenticateUser = true;
						$location.path ( "/tasks" );
					} else { 
						$scope.login.message = $scope.login.msg [ 5 ];
						$scope.login.errorPassowrd = true;
						$scope.login.invalidPassword = true;

						$timeout ( function ( ) { $scope.login.invalidPassword = false }, 800 );
					};

				} );

			};

			//Set reset
			if ( $scope.login.statusInfo && $user.email.indexOf ( "@" ) ) {
				$scope.login.load = true;

				$servicelogin.reset ( $user.email, function ( $data ) {
					$scope.login.load = false;
					console.log ( $data );

					if ( $data == "true" ) {
						$scope.login.status = true;
						$scope.login.message = $scope.login.msg [ 10 ];
						$scope.login.errorEmail = false;
						$scope.login.invalidEmail = false;

					} else { 
						$scope.login.status = false;
						$scope.login.message = $scope.login.msg [ 4 ];
						$scope.login.errorEmail = true;
						$scope.login.invalidEmail = true;

						$timeout ( function ( ) { $scope.login.invalidEmail = false; }, 800 );
					};

				} );

			};

		};

		function __reset ( ) {
			$scope.login.statusInfo = true;
			$scope.login.message = $scope.login.msg [ 8 ];
			$scope.login.action = $scope.login.msg [ 9 ];
			$scope.login.emailCache = "";
		};

		function __test ( ) {
			$scope.user = {
				email: "admin@admin.com",
				password: "admin1010",
			};
		};

	};


} ) ( );
