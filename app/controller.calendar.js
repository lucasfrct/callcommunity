( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar", [ "$scope", "$http", "$cookies", Calendar ] );

	function Calendar ( $scope, $http, $cookies ) {

		var $uri = "app/callserver/tasks.json";

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

		$scope.contacts = [ ];
		
		$scope.$watch ( "contacts", function ( $newValue ) { 
			$cookies.put ( "contacts", $newValue );
		} );

		query ( $http, "app/callserver/contacts.json", function ( $data ) { 
			$scope.contacts = $data;
		} )

		
		$scope.multimedia = [ ];
		
		$scope.$watch ( "multimedia", function ( $newValue ) { 
			$cookies.put ( "multimedia", $newValue );
		} );

		query ( $http, "app/callserver/multimedia.json", function ( $data ) { 
			$scope.multimedia = $data;
		} );


		$scope.messages = [ ];

		$scope.$watch ( "messages", function ( $newValue ) { 
			$cookies.put ( "messages", $newValue );
		} );

		query ( $http, "app/callserver/messages.json", function ( $data ) { 
			$scope.messages = $data;
		} );


		$scope.tasks = [ ];
		$scope.tasksList = { };

		$scope.$watch ( "tasks", function ( $newValue, $oldValue ) {
			$scope.tasksList = loadTasks ( $scope.tasks );
			$cookies.put ( "tasks", $scope.tasks );
			$cookies.put ( "tasksList", $scope.tasksList );
		} );

		query ( $http, $uri, function ( $data ) { 
			$scope.tasks = $data;
		} );

		console.log ( $cookies.getAll ( ) );
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



		var $todayDate = $Date ( "", "", $months );

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
				$scope.taskNew.date = new Date ( $scope.taskNew.date );
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
			toggleClass ( ".contacts.window",  "active" );
			$scope.contacts = contactsReset ( $scope.contacts );
		};

		$scope.contactAdd = function ( ) {

			var $contacts = angular.copy ( 
				$scope.contacts.filter ( function ( $contact ) { 
					return $contact.selected == true;
				} ) 
			);

			$scope.taskNew.contacts = uniqueArray ( [ ].concat ( $scope.taskNew.contacts,  $contacts ) );

			$scope.contactToggle ( );
		};

		$scope.audioToggle = function ( ) {
			toggleClass ( ".multimedia.window",  "active" );
		};

		$scope.audioAdd = function ( ) {

			var $audio = angular.copy ( 
				$scope.multimedia.filter ( function ( $audio ) { 
					return $audio.selected == true;
				} )[ 0 ] 
			);

			$scope.multimedia.map ( function ( $audio ) { 
				if ( $audio.selected == true ) {
					$audio.selected = false;
				};
			} );

			$scope.taskNew.audio = $audio;
			$scope.audioToggle ( );
		};

		$scope.messageToggle = function ( ) {
			toggleClass ( ".messages.window",  "active" );
		};

		$scope.messageAdd = function ( ) {

			var $message = angular.copy ( 
				$scope.messages.filter ( function ( $msg ) { 
					return $msg.selected == true;
				} )[ 0 ]
			);

			$scope.messages.map ( function ( $msg ) { 
				if ( $msg.selected == true ) {
					$msg.selected = false;
				};
			} );

			$scope.taskNew.message = $message;
			$scope.messageToggle ( );
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