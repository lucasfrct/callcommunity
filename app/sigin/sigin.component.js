( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.component ( "siginView", SiginView ( ) );

	function SiginView ( ) {
		return {
			templateUrl: "app/sigin/sigin.html", 
			controller: [ "$scope", "$siginservice", SiginController ],
		};
	};

	function SiginController ( $scope, $siginservice ) {
		$scope.showPassword = showPassword;
		$scope.sender = sender;
		
		$scope.toggles = {
			showPassword: false,
			authorized: false,
			existEmail: false,
			load: false,
		};

		$scope.sigin = {
			firstName: "Lucas",
			user: "lfc",
			email: "lucasfrct@gmail.com",
			password: "lucas123",
		};

		$scope.password = "lucas123";
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
				} 
				if ( $data [ 0 ] == 0 ) {
					alert ( "Ocoreu um erro no sistema, por favor tente mais tarde." );
				}
			} );
		};
	};
} ) ( );