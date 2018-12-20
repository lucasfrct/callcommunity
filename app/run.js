( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.run ( [ "$rootScope", "$location", RunEvents ] );

	function RunEvents ( $rootScope, $location ) {
		
		var $visitorRoutes = [ "/", "/login", "/sigin", ];
		var $userRoutes    = [ "/", "/login", "/sigin", "/calendar", ];

		$rootScope.authenticateUser = null;

		$rootScope.$on ( "$locationChangeStart", ChangeRoute );

		function ChangeRoute ( ) {

			//console.log ( $rootScope.authenticateUser );
			
			if ( null == $rootScope.authenticateUser && -1 != $visitorRoutes.indexOf ( $location.path ( ) ) ) {
				//console.log ( "router - Visitante permitido: "+$location.path ( ) );
			} else if ( null != $rootScope.authenticateUser && -1 != $userRoutes.indexOf ( $location.path ( ) ) ) {
				//console.log ( "router - Usuário permitido: "+$location.path ( ) );
			} else {
				console.log ( "Router - Acesso negado. ------>" );
				//$location.path ( "/login" );
			};

		};
	};

} ) ( );