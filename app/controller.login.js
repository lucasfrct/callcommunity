( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "login", [ "$scope", ControllerLogin ] );

	function ControllerLogin ( $scope, $http, $cookies ) {
		$scope.msg = "Iniciar sessão";

		$scope.validEmail = function ( ) {
			$scope.msg = "Introduzir senha";
		};
	};

} ) ( );