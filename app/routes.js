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

			.when ( "/login", {
				templateUrl: "login.html",
				controller: "login",
			} )

			.when ( "/sigin", {
				templateUrl: "sigin.html",
				controller: "sigin",
			} )
			
			.when ( "/tasks", {
				templateUrl: "tasks.html",
			} );


			/*.otherwise( {
            	redirectTo: 'callcommunity/index.html'
        	} );*/

			$locationProvider.html5Mode ( {
 				enabled: false, //true
  				requireBase: false,
			} );
	};

} ) ( );