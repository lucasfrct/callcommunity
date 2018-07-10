( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "sigin", [ "$scope", Sigin ] );

	function Sigin ( $scope ) {

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