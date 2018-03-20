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
			{ title: "tarefa 1", date: new Date ( 2018, 03, 12 ), hour: "9:00",
				contacts: [
					{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
					{ name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
				],
				repeat: { 
					dom: false,
					seg: true, 
					ter: false,
					qua: false, 
					qui: false,
					sex: false,
					sab: false,
				},
			},
			{ title: "tarefa 2", date: new Date ( 2018, 03, 12 ), hour: "12:00",
				contacts: [
					{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
					{ name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
					{ name: "Rafael Lírio", tel: "(22) 99709-9009", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
				],
				repeat: { 
					dom: false,
					seg: true, 
					ter: false,
					qua: true, 
					qui: false,
					sex: true,
					sab: false,
				},
			},
		];

		$scope.tasksList = {
			hour8: [ ],
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
				sab: false,
			},
			index: null,
		};

		$scope.contacts = [
			//{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
			{ name: "Rafael Lírio", tel: "(22) 99709-9009", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
			{ name: "Roberta Lírio", tel: "(22) 99709-5060", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
			{ name: "Lupe Sonso", tel: "(22) 090-5060", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
		];

		loadTasks ( $scope.tasks, $scope.tasksList );

		$scope.taskToggle = function ( ) {
			toggleClass ( ".calendar-task",  "active" );
			taskReset ( $scope, $currentDate );
		};

		$scope.contactToggle = function ( ) {
			toggleClass ( ".calendar-task-window",  "active" );

			$scope.contacts.map ( function ( $contact, $index ) { 
				return $contact.selected = false;
			} );
		};
		
		$scope.changeDate = function ( ) {
			var $date = $Date ( "", "", $months, $scope.currentDate );
			setCurrentDate ( $scope, $date.day, $date.week, $date.Month );
		};

		$scope.addContacts = function ( ) {
			$scope.taskNew.contacts = angular.copy ( $scope.contacts.filter ( function ( $item, $index ) {
				return $item.selected == true;
			} ) );

			$scope.contactToggle ( );
		};

		$scope.taskSave = function ( ) {
			
			if ( $scope.taskNew.index && $scope.taskNew.index >= 0 ) {
				$scope.tasks [ $scope.taskNew.index ] = angular.copy( $scope.taskNew );
			} else {
				$scope.tasks.push ( angular.copy ( $scope.taskNew ) );
			};

			loadTasks ( $scope.tasks, $scope.tasksList );
			
			$scope.taskToggle ( );
			
			console.log ( $scope.tasks );
		};

		$scope.taskLoad = function ( $number ) {
			$scope.taskToggle ( );

			var $number = String ( $number+":00" );
			var $index = null;
			$task = $scope.tasks.filter ( function ( $task, $index ) {
				$task.index = $index;
				return $task.hour == $number;
			} )[0];

			if ( !$task ) {
				taskReset ( $scope, $currentDate, $number );
			} else {
				$scope.taskNew = $task;
			};

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
					$list.hour8 [ 0 ] = ( $task.title );
					break;
				case "9:00":
					$list.hour9 [ 0 ] = ( $task.title );
					break;
				case "10:00":
					$list.hour10 [ 0 ] = ( $task.title );
					break;
				case "11:00":
					$list.hour11 [ 0 ] = ( $task.title );
					break;
				case "12:00":
					$list.hour12 [ 0 ] = ( $task.title );
					break;
				case "13:00":
					$list.hour13 [ 0 ] = ( $task.title );
					break;
				case "14:00":
					$list.hour14 [ 0 ] = ( $task.title );
					break;
				case "15:00":
					$list.hour15 [ 0 ] = ( $task.title );
					break;
				case "16:00":
					$list.hour16 [ 0 ] = ( $task.title );
					break;
				case "17:00":
					$list.hour17 [ 0 ] = ( $task.title );
					break;
			};
		} );
	};

	function taskReset ( $scope, $currentDate, $hour = null ) {
		$scope.taskNew = { };
		$scope.taskNew.title = ""; 
		$scope.taskNew.date = new Date ( $currentDate.Year, ( $currentDate.month - 1 ), $currentDate.day );
		$scope.taskNew.hour = ( $hour ) ? $hour : "8:00";
		$scope.taskNew.contacts = [ ];
		$scope.taskNew.repeat = { dom: false, seg: false, ter: false, qua: false, qui: false, sex: false, sab: false, };
		$scope.taskNew.index = null;
	};

} ) ( );