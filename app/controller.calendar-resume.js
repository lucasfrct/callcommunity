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

		$scope.currentDate = new Date ( $date.Year, $date.month, $date.day );

		setCalendar ( $scope, $date.day, $date.week, $date.Month );

		$scope.openCalendar = function ( ) {

			//var $element = document.querySelector ( ".date-resume" );
			//openPicker (  $element );
	
		};

		$scope.changeCalendar = function ( ) {
			var $date = $Date ( "", "", $months, $scope.currentDate );
			setCalendar ( $scope, $date.day, $date.week, $date.Month );
		};
	};

	function setCalendar ( $scope = "", $day = "", $week = "", $month = "" ) {
		$scope.day = $day;
		$scope.dayWeek = $week;
		$scope.month = $month;			
	};



function openPicker ( $element ) {
    
	$element.focus ( );


};

} ) ( );
