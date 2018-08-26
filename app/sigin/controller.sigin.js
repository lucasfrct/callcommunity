( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "sigin", [ "$scope", "$timeout", "servicesigin", Sigin ] );

	function Sigin ( $scope, $timeout, $serviceSigIn ) {

		$scope.sigIn = {
			message: "Criar uma nova conta",
			msg: [
				"Criar uma nova conta",
				"Espere um momento...",
				"Cadastro realizado com Sucesso.",
				"Esse email já está cadastrado.",
			],
			load: false,
			passwordConfirm: "",
			disabled: __disabled,
			save: __save,
			end: false,
		} 

		$scope.user = {
			name: "",
            email: "",
			password: "",
		};

		__test ( );

		function __disabled ( ) {
			var $status = true;

			$status = ( 
				!( $scope.user.name.length >= 3 )
				|| !( String ( $scope.user.email ).indexOf( "@" ) >= 0 )
				|| !( $scope.user.password.length >= 8 )
				|| !( $scope.sigIn.passwordConfirm == $scope.user.password )			
			) ? true : false;
			
			return $status;
		};

		function __save ( $user ) {

			var $status = false;
			
			$scope.sigIn.load = true;
			$scope.sigIn.message = $scope.sigIn.msg [ 1 ];

			$serviceSigIn.save ( $user,  function ( $data ) {

				console.log ( $data );
				$scope.sigIn.load = false;

				if ( $data == "true" ) {
					__setSigIn ( $scope.sigIn.msg [ 2 ] );
				} else {
					__ErrorSigIn ( );
				};

			}, 2000 );
		};

		function __setSigIn ( $msg ) {
			$scope.sigIn.message = $msg;
			$scope.sigIn.end = true;
		};

		function __ErrorSigIn ( ) {
			$scope.sigIn.message = $scope.sigIn.msg [ 3 ];
			$scope.sigIn.end = false;
		};

		function __test ( ) {
			$scope.user.name = "Administrador";
			$scope.user.email = "admin@admin.com";
			$scope.user.password = "administrador";
			$scope.sigIn.passwordConfirm = "administrador";
		};
	};

} ) ( );