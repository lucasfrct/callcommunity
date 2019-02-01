( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.controller ( "sigincontroller", [ "$scope", "$location", "$session", "$siginservice", sigincontroller ] );

	function sigincontroller ( $scope, $location, $session, $siginservice ) {
		$scope.showPassword = showPassword;
		$scope.sender = sender;
		
		$scope.toggles = {
			showPassword: false,
			authorized: false,
			existEmail: false,
			load: false,
		};

		$scope.sigin = {
			firstName: "",
			user: "",
			email: "",
			password: "",
		};

		$scope.password = "";
		$scope.msgEmail = "Pode utilizar letras, números, pontos e no mínimo 4 caracteres";

		function showPassword ( ) {
			$scope.toggles.showPassword = !$scope.toggles.showPassword;
		};

		function sender ( $data ) {
			$scope.toggles.load = true;
			$siginservice.sender ( $data, function ( $data ) { 
				$scope.toggles.load = false;
				if ( $data [ 0 ] == -1 ) {
					$scope.toggles.existEmail = true;
					$scope.msgEmail = "Esse email já está cadastrado no sistema. Por favor insira outro email."
				};
				if ( $data [ 0 ] == 1 ) {
					$scope.toggles.authorized = true;
					$session.redirect ( "/login" );
				} 
				if ( $data [ 0 ] == 0 ) {
					alert ( "Ocoreu um erro no sistema, por favor tente mais tarde." );
				}
			} );
		};
	};
} ) ( );