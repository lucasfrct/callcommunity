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

		$scope.tasks = [ 
			{ id: 1, index: null, title: "tarefa 1", date: new Date ( 2018, 03, 12 ), hour: "9:00", caller: true, sms: false,
				contacts: [
					{ id: 1, name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
					{ id: 2, name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
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
			{ id: 2, index: null, title: "tarefa 2", date: new Date ( 2018, 03, 12 ), hour: "12:00", caller: false, sms: true,
				contacts: [
					{ id: 3, name: "Rafael Lírio", tel: "(22) 99709-9009", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
					{ id: 4, name: "Roberta Lírio", tel: "(22) 99709-5060", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
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

		$scope.contacts = [
			{ id: 1, name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ id: 2, name: "Cristiane Costa", tel: "(12) 98123-1965", condominium: "Condomínio Costa Resplandecer, Bl 14B Ap 1023A", selected: false, },
			{ id: 3, name: "Rafael Lírio", tel: "(22) 99709-9009", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
			{ id: 4, name: "Roberta Lírio", tel: "(22) 99709-5060", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
			{ id: 5, name: "Lupe Sonso", tel: "(22) 090-5060", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
			{ id: 6, name: "Lupe Bobo", tel: "(12) 11111-1111", condominium: "Condomínio Paineras, Bl 14B Ap 1023A", selected: false, },
		];

		$scope.multimedia = [ ];

		$scope.mesages = [ ];
		
		$scope.tasksList = { };
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var $todayDate = $Date ( "", "", $months );
		//alert ( JSON.stringify ( $currentDate ) );

		$scope.currentDate = initCurrentDate ( $todayDate );

		$scope.currentDay = $todayDate.day;
		$scope.currentDayWeek = $todayDate.Week;
		$scope.currentMonth = $todayDate.Month;
		
		$scope.tasksList = loadTasks ( $scope.tasks );

		$scope.taskNew = taskReset ( initCurrentDate ( $todayDate ) );

		$scope.changeDate = function ( ) {
			$date = dateUpdate ( $scope.currentDate );

			$scope.currentDay = $date.day;
			$scope.currentDayWeek = $date.Week;
			$scope.currentMonth = $date.Month;

			$scope.tasksList = loadTasks ( $scope.tasks );
		};
		
		$scope.taskToggle = function ( ) {
			toggleClass ( ".calendar-task",  "active" );
			$scope.taskNew = taskReset ( initCurrentDate ( $todayDate ) );
		};

		$scope.taskLoad = function ( $hour ) {
			$scope.taskToggle ( );

			var $hour = String ( $hour+":00" );

			$taskLoad = angular.copy ( $scope.tasks.filter ( function ( $task, $index ) {
				$task.index = $index;
				return $task.hour == $hour;
			} )[0] );

			if ( $taskLoad && typeof $taskLoad === "object" ) {
				$scope.taskNew = $taskLoad;
			} else {
				$scope.taskNew = taskReset ( initCurrentDate ( $todayDate ), $hour  );
			};

			$scope.tasksList = loadTasks ( $scope.tasks );
		};

		$scope.taskSave = function ( ) {
			var $index = $scope.taskNew.index;

			if (  $index !== null && $index >= 0 ) {
				$scope.tasks [ $index ] = angular.copy( $scope.taskNew );
			} else {
				$scope.tasks.push ( angular.copy ( $scope.taskNew ) );
			};

			$scope.tasksList = loadTasks ( $scope.tasks );
			$scope.taskToggle ( );
		};

		$scope.taskDelete = function ( ) {

			var $delete = confirm ( "Deseja deletar esta Tarefa?" );

			if ( $delete && $scope.taskNew.index !== null && $scope.taskNew.index >= 0 ) {
				$scope.tasks.splice ( $scope.taskNew.index, 1 );

			};

			$scope.tasksList = loadTasks ( $scope.tasks );
			$scope.taskToggle ( );

		};
		
		$scope.contactToggle = function ( ) {
			toggleClass ( ".calendar-task-window",  "active" );
			$scope.contacts = contactsReset ( $scope.contacts );
		};

		$scope.addContacts = function ( ) {

			var $contacts = angular.copy ( 
				$scope.contacts.filter ( function ( $contact ) { 
					return $contact.selected == true;
				} ) 
			);

			$scope.taskNew.contacts = uniqueArray ( [ ].concat ( $scope.taskNew.contacts,  $contacts ) );

			$scope.contactToggle ( );
		};

	};



	///////////////////////////////////////////////////////////////////////

	function initCurrentDate ( $currentDate ) {
		return new Date ( $currentDate.Year, ( $currentDate.month - 1 ), $currentDate.day );
	};

	function dateUpdate ( $date, $months ) {
		return $Date( "", "", $months, $date );
	};

	function setCurrentDate ( $scope = "", $day = "", $week = "", $month = "" ) {			
	};

	function loadTasks ( $tasks ) {
		var $list = { };
		$tasks.map ( function ( $task, $index ) {
			switch ( $task.hour ) {

				case "8:00":
					$list.hour8 = $task.title ;
					break;
				case "9:00":
					$list.hour9 = ( $task.title );
					break;
				case "10:00":
					$list.hour10 = ( $task.title );
					break;
				case "11:00":
					$list.hour11 = ( $task.title );
					break;
				case "12:00":
					$list.hour12 = ( $task.title );
					break;
				case "13:00":
					$list.hour13 = ( $task.title );
					break;
				case "14:00":
					$list.hour14 = ( $task.title );
					break;
				case "15:00":
					$list.hour15 = ( $task.title );
					break;
				case "16:00":
					$list.hour16 = ( $task.title );
					break;
				case "17:00":
					$list.hour17 = ( $task.title );
					break;
			};
		} );

		return  $list;
	};

	function taskReset ( $currentDate, $hour = null ) {
		var $taskNew = {
			id: null,
			index: null,
			title: "",
			date: $currentDate,
			hour: ( $hour ) ? $hour : "8:00",
			caller: false,
			sms: false,
			contacts: [ ],
			repeat: { dom: false, seg: false, ter: false, qua: false, qui: false, sex: false, sab: false, },
		};

		return $taskNew;
	};

	function contactsReset ( $contacts ) {
		$contacts.map ( function ( $contact ) { 
			return $contact.selected = false;
		} );
		return $contacts;
	};

	function uniqueArray ( $origArr ) {
	    var $newArr = [ ];
	    var $origLen = $origArr.length;
	    var $found;
	    var $x;
	    var $y;

	    for ( $x = 0; $x < $origLen; $x++ ) {
	        
	        $found = undefined;
	        
	        for ( $y = 0; $y < $newArr.length; $y++ ) {
	            if ( $origArr [ $x ].id == $newArr [ $y ].id ) {
	                $found = true;
	                break;
	            };
	        };

	        if ( !$found ) {
	            $newArr.push ( $origArr [ $x ] );
	        };
	    };

	    return $newArr;
	};

} ) ( );