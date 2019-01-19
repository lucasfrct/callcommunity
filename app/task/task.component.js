( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.component ( "taskView", TaskView ( ) );

	function TaskView ( ) {
		return {
			templateUrl: "app/task/task.html",
			controller: [ "$scope", "$session", "$taskservice", taskcontroller ],
		};
	};
	
	function taskcontroller ( $scope, $session, $taskservice ) {
		$session.check ( );

		$scope.openTask = openTask;

		$scope.tasks = [
			{ hour: 8, title: "Reunião", local: "Sala 05" },
			{ hour: 12, title: "Reunião", local: "Sala 05" },
			{ hour: 16, title: "Reunião", local: "Sala 05" }
		];
		
		$scope.taskView = gerateTaskView ( $scope.tasks );

		function gerateTaskView ( $tasks ) {
			var $taskView = [ ];
			var $count = $tasks.length;
			var $index = 0;
			var $add = null;
			for ( var $i = 8; $i <= 17; $i++ ) {
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

	};
} ) ( );