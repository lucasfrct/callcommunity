( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.run ( [ "$rootScope", "$location", "$cookies", RunEvents ] );

	function RunEvents ( $rootScope, $location, $cookies ) {
		var $visitorRoutes = [ "/", "/login" ];
		var $userRoutes = [ "/", "/login", "/tasks", "/contacts", "/multimedia", "messages" ];

		$rootScope.authenticateUser = null;

		$rootScope.$on ( "$locationChangeStart", ChangeRoute );

		function ChangeRoute ( ) {

			console.log ( $rootScope.authenticateUser );
			
			if ( null == $rootScope.authenticateUser && -1 != $visitorRoutes.indexOf ( $location.path ( ) ) ) {
				console.log ( "router - Visitante permitido: "+$location.path ( ) );
			} else if ( null != $rootScope.authenticateUser && -1 != $userRoutes.indexOf ( $location.path ( ) ) ) {
				console.log ( "router - Usuário permitido: "+$location.path ( ) );
			} else {
				console.log ( "Router - Acesso negado. ------>" );
				$location.path ( "/login" );
			};

		};
	};

} ) ( );