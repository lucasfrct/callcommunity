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
				"Essa conta já está cadastrada.",
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
			//console.log ( $user );

			var $status = false;

			$scope.sigIn.load = true;
			$scope.sigIn.message = $scope.sigIn.msg [ 1 ];

			$serviceSigIn.save ( $user,  function ( $data ) {
				
				__setSigIn ( $scope.sigIn.msg [ 2 ] );

			}, 2000 );
		};

		function __setSigIn ( $msg ) {
			$scope.sigIn.load = false;
			$scope.sigIn.message = $msg;
			$scope.sigIn.end = true;
		};

		function __test ( ) {
			$scope.sigIn.passwordConfirm = "asdfasdf";
			$scope.user.name = "Lucas";
			$scope.user.email = "lucasfrct@gmail.com";
			$scope.user.password = "asdfasdf";
		};
	};

} ) ( );