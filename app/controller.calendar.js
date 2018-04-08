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

		var $todayDate = $Date ( true, $months );

		$scope.contacts = cookieGet( $cookies, "contacts" );
		
		$scope.$watch ( "contacts", function ( $contacts ) { 
			cookiePut( $cookies, "contacts", $contacts );
		}, true );

		query ( $http, "app/callserver/contacts.json", function ( $contacts ) { 
			$scope.contacts = $contacts;
		} );
		
		$scope.multimedia = cookieGet ( $cookies, "multimedia" );
		
		$scope.$watch ( "multimedia", function ( $multimedia ) { 
			cookiePut ( $cookies, "multimedia", $multimedia );
		}, true );

		query ( $http, "app/callserver/multimedia.json", function ( $multimedia ) { 
			$scope.multimedia = $multimedia;
		} );

		$scope.messages = cookieGet ( $cookies, "messages" );

		$scope.$watch ( "messages", function ( $messages ) { 
			cookiePut ( $cookies, "messages", $messages );
		}, true );

		query ( $http, "app/callserver/messages.json", function ( $messages ) { 
			$scope.messages = $messages;
		} );

		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.tasks = cookieGet( $cookies, "tasks" );
		$scope.tasksList = loadTasks ( $scope.tasks );

		$scope.$watch ( "tasks", function ( ) {
			cookiePut ( $cookies, "tasks", $scope.tasks );
			$scope.tasksList = loadTasks ( $scope.tasks );
		}, true );


		query ( $http, $uri, function ( $tasks ) { 
			$scope.tasks = $tasks;
		} );

		$scope.$watch ( "currentDate", function ( $newDate ) {
			console.log ( "consulta todas as tarefas com a data selecionada" );
			queryTasks ( $http, $date );
		}, true );

		//cookieClearAll ( $cookies );

		/*
		server 0.south-america.pool.ntp.org
		server 1.south-america.pool.ntp.org
		server 2.south-america.pool.ntp.org
		server 3.south-america.pool.ntp.org
		*/

		query ( $http, "ntp.php", function ( $data ) {
			console.log ( $data );
		} );
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.currentDate = $Date ( );

		$scope.$watch ( "currentDate", function ( $newDate ) { 
			$scope.dataObj = $Date ( true, $scope.currentDate, $months );
			$scope.currentDay = $scope.dataObj.day;
			$scope.currentDayWeek = $scope.dataObj.week;
			$scope.currentMonth = $scope.dataObj.Month;
		}, true );
		
		$scope.tasksList = loadTasks ( $scope.tasks );

		$scope.taskNew = taskReset ( $Date ( ) ); 
		console.log ( $scope.taskNew );
		
		$scope.taskToggle = function ( ) {
			toggleClass ( ".calendar-task",  "active" );
			$scope.taskNew = taskReset ( $Date ( ) );
		};

		$scope.taskLoad = function ( $hour ) {
			$scope.taskToggle ( );

			var $hour = String ( $hour+":00" );

			$taskLoad = angular.copy ( $scope.tasks.filter ( function ( $task, $index ) {
				$task.index = $index;
				return $task.hour == $hour;
			} )[0] );

			if ( $taskLoad && "object" === typeof $taskLoad ) {
				$scope.taskNew = $taskLoad;
				$scope.taskNew.date = $Date ( $scope.taskNew.date );
			} else {
				$scope.taskNew = taskReset ( $Date ( ), $hour  );
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
			var $delete = confirm ( 'Deseja deletar a tarefa "'+$scope.taskNew.title+'"?' );

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

	function loadTasks ( $tasks ) {
		var $list = { };
		if ( angular.isArray ( $tasks ) ) {
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
		};

		return  $list;
	};

	function taskReset ( $currentDate = null, $hour = null ) {
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

	function queryTasks ( $http = null, $date = null ) {
		var $uri = "lib/crud/Service.php";
		
		var $read = { 
			'action': "read", 
			'table': "callcommunity.tasks", 
			'fields': "*",
		};

		$http ( {
			url: $uri,
			method: "POST",
			data: $read,
			dataType: 'json',
			headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' },
		} )
			.then ( function ( $data ) {
				console.log ( $data.data );
			}, function ( $error ) {
				console.log ( "error" );
			} );

	};

} ) ( );