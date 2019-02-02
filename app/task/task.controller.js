( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.controller ( "taskcontroller", [ "$scope", "$session", "$taskservice", taskcontroller ] );
	
	function taskcontroller ( $scope, $session, $taskservice ) {
		$session.check ( );

		$scope.openTask = openTask;
		$scope.menu = __menu;
		$scope.aside = true;
		$scope.calendar = __calendar ( );

		$scope.tasks = [
			{ hour: 8, title: "Reunião", local: "Sala 05" },
			{ hour: 12, title: "Reunião", local: "Sala 05" },
			{ hour: 16, title: "Reunião", local: "Sala 05" }
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
			console.log ( $scope.aside );
		};

		function __calendar ( ) {
			var $date = $Date ( ); 
			return $Date ( ).calendar ( $date.m, $date.Y );
		};

	};
} ) ( );