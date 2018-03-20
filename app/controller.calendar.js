( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar", Calendar );

	function Calendar ( $scope ) {

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

		var $currentDate = $Date ( "", "", $months );
		initCurrentDate ( $scope, $currentDate );

		$scope.tasks = [ 
			{ title: "tarefa 1", date: new Date ( 2018, 03, 12 ), hour: "9:00", contacts: [ ], repeat: null, },
			{ title: "tarefa 2", date: new Date ( 2018, 03, 12 ), hour: "14:00", contacts: [ ], repeat: null, },
		];

		$scope.tasksList = {
			hour8: [ "t1", "t2", ],
			hour9: [ ],
			hour10: [ ],
			hour11: [ ],
			hour12: [ ],
			hour13: [ ],
			hour14: [ ],
			hour15: [ ],
			hour16: [ ],
			hour17: [ ],
		};

		$scope.taskNew = {
			title: "",
			date: new Date( $currentDate.Year, ( $currentDate.month - 1 ), $currentDate.day ),
			hour: "8:00",
			contacts: [
				//{ name: "Lucas Costa", cel: "(12) 99128-5145", condominium: "Condomínio Cosrta Sol" },
			],
			repeat: { 
				dom: false,
				seg: false, 
				ter: false,
				qua: false, 
				qui: false,
				sex: false,
				sab: true,
			},
		};

		$scope.contacts = [
			//{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
			{ name: "Rafael Lírio", tel: "(22) 99709-9009", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
		];

		loadTasks ( $scope.tasks, $scope.tasksList );

		$scope.changeDate = function ( ) {
			var $date = $Date ( "", "", $months, $scope.currentDate );
			setCurrentDate ( $scope, $date.day, $date.week, $date.Month );
		};


		$scope.taskToggle = function ( ) {
			toggleClass ( ".calendar-task",  "active" );
		};

		$scope.contactToggle = function ( ) {
			toggleClass ( ".calendar-task-window",  "active" );
		};

		$scope.inChange = function ( ) {
			console.log ( $scope.taskNew );
		};

		$scope.addContacts = function ( ) {
			$scope.taskNew.contacts = angular.copy ( $scope.contacts.filter ( function ( $item, $index ) {
				return $item.selected == true;
			} ) );

			$scope.contactToggle ( );
		};

		$scope.taskSave = function ( ) {
			$scope.tasks.push ( angular.copy ( $scope.taskNew ) );
			$scope.taskToggle ( );

			loadTasks ( $scope.tasks, $scope.tasksList );

			console.log ( $scope.tasks );
		};

	};

	function initCurrentDate ( $scope, $currentDate ) {
		$scope.currentDate = new Date ( $currentDate.Year, $currentDate.month, $currentDate.day );
		setCurrentDate ( $scope, $currentDate.day, $currentDate.week, $currentDate.Month );
	};

	function setCurrentDate ( $scope = "", $day = "", $week = "", $month = "" ) {
		$scope.currentDay = $day;
		$scope.currentDayWeek = $week;
		$scope.currentMonth = $month;			
	};

	function loadTasks ( $tasks, $list ) {
		$tasks.filter ( function ( $task, $index ) {
			switch ( $task.hour ) {

				case "8:00":
					$list.hour8.push ( $task.title );
					break;
				case "9:00":
					$list.hour9.push ( $task.title );
					break;
				case "10:00":
					$list.hour10.push ( $task.title );
					break;
				case "11:00":
					$list.hour11.push ( $task.title );
					break;
				case "12:00":
					$list.hour12.push ( $task.title );
					break;
				case "13:00":
					$list.hour13.push ( $task.title );
					break;
				case "14:00":
					$list.hour14.push ( $task.title );
					break;
				case "15:00":
					$list.hour15.push ( $task.title );
					break;
				case "16:00":
					$list.hour16.push ( $task.title );
					break;
				case "17:00":
					$list.hour17.push ( $task.title );
					break;
					

			};
		} );
	};

} ) ( );