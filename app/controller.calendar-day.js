( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar-day", CalendarDay );

	function CalendarDay ( $scope ) {

		var $tasks = {
			hour8: "t1,t2",
			hour9: "t3,t4",
			hour10: "t5,t6",
			hour11: "t7,t8",
			hour12: "t9",
			hour13: "t10,t11",
			hour14: "t12",
			hour15: "",
			hour16: "t13",
			hour17: "t14,t15",
		};

		setList ( $scope, $tasks );
	};

	function setList ( $scope, $tasks = "" ) {

		$scope.hour8 = $tasks.hour8;
		$scope.hour9 = $tasks.hour9;
		$scope.hour10 = $tasks.hour10;
		$scope.hour11 = $tasks.hour11;
		$scope.hour12 = $tasks.hour12;
		$scope.hour13 = $tasks.hour13;
		$scope.hour14 = $tasks.hour14;
		$scope.hour15 = $tasks.hour15;
		$scope.hour16 = $tasks.hour16;
		$scope.hour17 = $tasks.hour17;

	};

} ) ( );