( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "user", [ "$scope", createUser ] );

	function createUser ( $scope ) {

		$scope.menssage = [ 
			"Criar um usuário",
		];

		$scope.user = {
			email: "",
			name: "",
			nick: "",
			password: "",
		};

	};

} ) ( );