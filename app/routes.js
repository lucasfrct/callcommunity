( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.config ( [ '$routeProvider', '$locationProvider', Routes ] );

	function Routes ( $routeProvider, $locationProvider ) {
		$routeProvider
			.when ( "/", {
				templateUrl: "preload.html",
			} )

			.when ( "login", {
				tamplateUrl: "/login.html",
			} )

			/*.otherwise( {
            	redirectTo: 'callcommunity/index.html'
        	} );*/

			$locationProvider.html5Mode ( {
 				enabled: false, //true
  				requireBase: false,
			} );
	};

} ) ( );