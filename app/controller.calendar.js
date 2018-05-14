( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar", [ "$scope", "$http", "$cookies", "$filter", "tasks", "contacts", "multimedia", "messages", Calendar ] );

	function Calendar ( $scope, $http, $cookies, $filter, $serviceTasks, $serviceContacts, $serviceMultimedia, $serviceMessages ) {

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

		var $todayDate = $Date ( true, $months );

		$scope.contacts = cookieGet( $cookies, "contacts" );
		
		$scope.$watch ( "contacts", function ( $contacts ) { 
			cookiePut( $cookies, "contacts", $contacts );
		}, true );

		$serviceContacts.read ( "*", function ( $data ) {
			$scope.contacts = $data;
		} );

		$scope.multimedia = cookieGet ( $cookies, "multimedia" );
		
		$scope.$watch ( "multimedia", function ( $multimedia ) { 
			cookiePut ( $cookies, "multimedia", $multimedia );
		}, true );

		$serviceMultimedia.read ( "*", function ( $data ) {
			$scope.multimedia = $data;
		} );

		$scope.messages = cookieGet ( $cookies, "messages" );

		$scope.$watch ( "messages", function ( $messages ) { 
			cookiePut ( $cookies, "messages", $messages );
		}, true );

		$serviceMessages.read ( "*", function ( $data ) {
			$scope.messages = $data;
		} );

		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//cookieClearAll ( $cookies );
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.currentDate = $Date ( );

		$scope.$watch ( "currentDate", function ( $newDate ) { 
			$scope.dataObj = $Date ( true, $scope.currentDate, $months );
			$scope.currentDay = $scope.dataObj.day;
			$scope.currentDayWeek = $scope.dataObj.week;
			$scope.currentMonth = $scope.dataObj.Month;
			upRead( $scope );
		}, true );

		$scope.tasks = cookieGet( $cookies, "tasks" );
		$scope.tasksList = taskLoad ( $scope.tasks );

		$scope.$watch ( "tasks", function ( ) {
			cookiePut ( $cookies, "tasks", $scope.tasks );
			$scope.tasksList = taskLoad ( $scope.tasks );
		}, true );

		$scope.$watch ( "upRead", function ( $up ) {
			$serviceTasks.read ( $scope.currentDate, function ( $data ) {
				$scope.tasks = tasksModel ( $data );
			} );
		}, true );
	

		$scope.taskNew = taskReset ( $Date ( ), "8:00" ); 
		
		$scope.taskToggle = function ( ) {
			toggleClass ( ".calendar-task",  "active" );
			$scope.taskNew = taskReset ( $Date ( ), "8:00" );
			$scope.tasksList = taskLoad ( $scope.tasks );
		};

		$scope.taskLoad = function ( $hour ) {
			$scope.taskToggle ( );

			$scope.taskNew = angular.copy ( $scope.tasks.filter ( function ( $task ) {
				return $task.hour == $hour;
			} )[0] || taskReset ( $Date ( ), $hour  ) );
		};

		$scope.taskSave = function ( ) {
			var $task = angular.copy ( $scope.taskNew );

			modalToggle ( );

			if ( $task.index !== null && $task.index >= 0 && $task.id  >= 1 ) {

				$serviceTasks.update ( $task, function ( $data ) {
					if ( $data == "true" ) {
						upRead( $scope );
						$scope.taskToggle ( );
					};
					modalToggle ( 400 );
				} );				

			} else if ( $task.index == null && $task.id == null ) {
				
				$serviceTasks.create ( $task, function ( $data ) {
					if ( $data == "true" ) {
						upRead( $scope );
						$scope.taskToggle ( );
					};
					modalToggle ( 400 );
				} );

			};
		};

		$scope.taskDelete = function ( ) {

			var $task = angular.copy ( $scope.taskNew );

			modalToggle ( );

			var $delete = confirm ( 'Deseja deletar a tarefa "'+$task.title+'"?' );

			if ( $delete && $task.id >= 1 ) {
				
				 $serviceTasks.delete ( $task, function ( $data ) {
				 	if ( $data == "true" ) {
				 		upRead( $scope );
						$scope.taskToggle ( );
				 	};
				 	modalToggle ( 400 );
				 } );
			};
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

	function taskLoad ( $tasks ) {
		var $list = { };
		if ( angular.isArray ( $tasks ) ) {
			$tasks.map ( function ( $task ) {
				switch ( $task.hour ) {

					case "8:00":
						$list.hour8 = $task.title ;
						break;
					case "9:00":
						$list.hour9 = $task.title;
						break;
					case "10:00":
						$list.hour10 = $task.title;
						break;
					case "11:00":
						$list.hour11 = $task.title;
						break;
					case "12:00":
						$list.hour12 = $task.title;
						break;
					case "13:00":
						$list.hour13 = $task.title;
						break;
					case "14:00":
						$list.hour14 = $task.title;
						break;
					case "15:00":
						$list.hour15 = $task.title;
						break;
					case "16:00":
						$list.hour16 = $task.title;
						break;
					case "17:00":
						$list.hour17 = $task.title;
						break;
				};
			} );
		};

		return  $list;
	};

	function taskReset ( $currentDate = null, $hour = null ) {
		return {
			index: null,
			id: null,
			title: "",
			date: ( $currentDate ) ? $currentDate : $Date ( ),
			hour: ( $hour ) ? $hour : "8:00",
			caller: false,
			sms: false,
			audio: null,
			contacts: [ ],
			repeat: { dom: false, seg: false, ter: false, qua: false, qui: false, sex: false, sab: false, },
		};
	};

	function tasksModel ( $tasks ) {
		$tasks = $tasks.map ( function ( $task, $index ) {
			if ( $task.caller === "1" ) { $task.caller = true; };
			if ( $task.caller === "0" ) { $task.caller = false; };
			if ( $task.sms === "1" ) { $task.sms = true; };
			if ( $task.sms === "0" ) { $task.sms = false; };

			$task.repeat = $task.repeated;
			$task.date = $Date ( $task.dated );
			
			delete $task.repeated;
			delete $task.dated;
			delete $task.enable;
			return $task;
		} );
		return $tasks;
	}

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