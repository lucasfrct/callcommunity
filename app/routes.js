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

			.when ( "/sigin", {
				templateUrl: "app/sigin/sigin.html",
				controller: "sigin",
			} )

			.when ( "/login", {
				templateUrl: "app/login/login.html",
				controller: "login",
			} )
			
			.when ( "/tasks", {
				templateUrl: "app/tasks/tasks.html",
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