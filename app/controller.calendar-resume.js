( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity")
		.controller ( "calendar-resume", CalendarResume );

	function CalendarResume ( $scope ) {

		var $months = [ 
			"janeiro", 
			"fevereiro", 
			"março", 
			"abril", 
			"maio", 
			"junho", 
			"julho", 
			"agosto", 
			"setembro", 
			"outubro", 
			"novenbro", 
			"dezembro", 
		];

		var $date = $Date ( "", "", $months );
		setCalendar ( $scope, $date.day, $date.week, $date.Month ); 
	};

	function setCalendar ( $scope = "", $day = "", $week = "", $month = "" ) {
		$scope.day = $day;
		$scope.dayWeek = $week;
		$scope.month = $month;			
	};

} ) ( );