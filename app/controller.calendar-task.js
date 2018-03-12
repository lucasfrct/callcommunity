( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar-task", CalendarTask );

	function CalendarTask ( $scope ) {

		$scope.toggle = "";

		$scope.taskToggle = function ( $this ) {
			$scope.toggle = "active";
			alert ( 1 );
		};
	};

} ) ( );