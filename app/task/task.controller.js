( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.controller ( "taskcontroller", [ "$scope", "$session", "$taskservice", taskcontroller ] );
	
	function taskcontroller ( $scope, $session, $taskservice ) {
		$session.check ( );

		$scope.aside = false;
		$scope.date = $Date ( );
		$scope.openTask = openTask;
		$scope.menu = __menu;
		$scope.calendar = __calendar ( );
		$scope.previous = __previous;
		$scope.next = __next;
		$scope.daySelect = __daySelect;
		$scope.today = __today;
		$scope.previousDay = __previousDay;
		$scope.nextDay = __nextDay;

		$scope.tasks = [
			{ year: 2019, month: 2, day: 3, hour: 8, title: "Reunião", local: "Sala 05" },
			{ year: 2019, month: 2, day: 3, hour: 12, title: "Reunião", local: "Sala 05" },
			{ year: 2019, month: 2, day: 3, hour: 16, title: "Reunião", local: "Sala 05" }
		];
		
		$scope.taskView = gerateTaskView ( $scope.tasks );

		function gerateTaskView ( $tasks, $init = 8, $end = 17 ) {
			var $taskView = [ ];
			var $count = $tasks.length;
			var $index = 0;
			var $add = null;
			for ( var $i = $init; $i <= $end; $i++ ) {
				if ( $index < $count && $tasks [ $index ].hour == $i ) {
					$add = $tasks [ $index ]
					$index++;
				} else {
					$add = { hour: $i, title: "", local: "" };
				};
				$taskView.push ( $add );
			};
			return $taskView;
		};

		function openTask ( $task ) {
			console.log ( $task );
		};

		function __menu ( ) {
			$scope.aside = !$scope.aside;
		};

		function __calendar ( $year = 1970, $month = 1 ) {
			if ( $month == 1 && $year == 1970 ) {
				$month = $scope.date.m;
				$year = $scope.date.Y;
			};
			return $Date ( ).calendar ( $year, $month );
		};

		function __previous ( $year = 1970, $month = 1 ) { 
			
			if ( $month == 1 ) {
				$month = 12;
				$year =  ( $year - 1 ); 
			} else {
				$month = ( $month - 1 );
			}; 

			$scope.calendar = __calendar ( $year, $month );
		};

		function __next ( $year = 1970, $month = 1 ) {

			if ( $month == 12 ) {
				$month = 1;
				$year = ( $year + 1 );
			} else {
				$month = $month + 1;
			};

			$scope.calendar = __calendar ( $year, $month );
		};

		function __daySelect ( $year = 1970, $month = 1, $day = 1 ) {
			$scope.date = $Date ( String ( $year+"/"+$month+"/"+$day ) );
		};

		function __today ( ) {
			$scope.date = $Date ( );
		};

		function __previousDay ( $day = 1 ) {
			
			if ( $scope.date.m > 1 && $day == 1 ) {
				$scope.date.m = ( $scope.date.m - 1 );
			} else if ( $scope.date.m == 1 && $day == 1 ) {
				$scope.date.m = 12;
				$scope.date.Y = ( $scope.date.Y - 1 ); 
			};
		
			if ( $day > 1 ) {
				$day = ( $day - 1 );
			} else if ( $day == 1 ) {
				$day = $Date ( String ( $scope.date.Y+"/"+$scope.date.m+"/1" ) ).n;
			};

			$scope.date = $Date ( String ( $scope.date.Y+"/"+$scope.date.m+"/"+$day ) );
		};

		function __nextDay ( $day = 1 ) {

			if ( $scope.date.m == 12 && $day == $scope.date.n ) {
				$scope.date.m = 1;
				$scope.date.Y = ( $scope.date.Y + 1 );
			} else if ( $day == $scope.date.n ) {
				$day = 1;
				$scope.date.m = ( $scope.date.m + 1 );
			} else {
				$day = ( $day + 1 );
			};
			
			$scope.date = $Date ( String ( $scope.date.Y+"/"+$scope.date.m+"/"+$day ) );
		};

	};
} ) ( );