( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.config ( RouteConfig );

	function RouteConfig ( $routeProvider, $locationProvider ) {
  		$routeProvider
	    	.when ( "/", {
	    		controller: 'logincontroller',
	      		templateUrl:"app/login/login.html"
	    	} )
	    	.when ( "/login", {
	    		controller: 'logincontroller',
	      		templateUrl:"app/login/login.html"
	    	} )
	    	.when ( "/sigin", {
	    		controller: 'sigincontroller',
	      		templateUrl:"app/sigin/sigin.html"
	    	} )
	    	.when ( "/task", {
	    		controller: 'taskcontroller',
	      		templateUrl:"app/task/task.html"
	    	} )
	    	
	    	.otherwise( { redirectTo: '/' } );

	    /*
	    $locationProvider
	    	.html5Mode ( true );
	    */
	};

} ) ( );