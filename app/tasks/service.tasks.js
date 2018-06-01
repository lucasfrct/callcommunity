( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "tasks", [ "$http", "$filter", ServiceTasks ] );
	
	function ServiceTasks ( $http, $filter ) {

		var $tasks = this;

		var $uri = "lib/crud/Service.php";	

		$tasks.create = taskCreate;

		$tasks.read = taskRead;
		
		$tasks.update = taskUpdate;
		
		$tasks.delete = taskDelete;

		$tasks.run = taskRun;

		function taskCreate ( $task = null, $fn = null ) {
		
			var $create = { 
				action: "create", 
				table: "tasks",
				data: {
					title: $task.title,
					dated: $filter ( 'date' )( $task.date , 'yyyy-M-d' ),
					hour: $task.hour,
					caller: $task.caller,
					sms: $task.sms,
					audio: $task.audio,
					message: $task.message,
					contacts: $task.contacts,
					repeated: $task.repeat,
				}
			};

			query ( $create, $fn );
		};

		function taskRead ( $date = null, $fn = null ) {

			var $read = {
				action: "read",
				table: "tasks", 
				fields: "*",
				condition: { dated: $filter ( 'date' )( $date , 'yyyy-M-d' ) }
			};

			query ( $read, $fn );
		};

		function taskUpdate ( $task = null, $fn = null ) {

			var $update = { 
				action: "update", 
				table: "tasks",
				id: $task.id,
				data: {
					title: $task.title,
					dated: $filter ( 'date' )( $task.date , 'yyyy-M-d' ),
					hour: $task.hour,
					caller: $task.caller,
					sms: $task.sms,
					audio: $task.audio,
					message: $task.message,
					contacts: $task.contacts,
					repeated: $task.repeat,
				}
			};

			query ( $update, $fn );
		};

		function taskDelete ( $task = null, $fn = null ) {
			
			var $delete = { action: "delete", table: "tasks", id: $task.id };

			query ( $delete, $fn );
		};

		function taskRun ( $task = null, $fn = null ) {
			console.log ( "------------------RUN TASK! ---------------" );
			
			var $data = { 
				numero_destino : "12991285145",
				mensagem: "teste Total Voice JSON 2",
				resposta_usuario: true,
				multi_sms: true,
				data_criacao: "2017-03-30T17:17:14-03:00"
			};

			$http ( {
				url: "https://api.totalvoice.com.br/sms",
				method: "POST",
				data: $data,
				headers : { 
					'Content-Type': "application/json",
					"Accept": "application/json",
					"Access-Token" : "7338d6b3a783543e6c0788bf92ad34a6"
				},
				responseType: 'text',
			} )
			.then ( function ( $data ) {
				console.log ( $data.data );
			}, function ( $error ) {
				alert ( "error" );
			} );

		};

		function query ( $query = null, $fn = null ) {
			$http ( {
				url: $uri,
				method: "POST",
				data: "callcommunity="+JSON.stringify ( $query ),
				headers : { 'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8" },
				responseType: 'text',
			} )
			.then ( function ( $data ) {
				if ( null !== $fn ) {
					$data = $data.data;
					if ( angular.isArray ( $data ) ) {
						$data = $data.map ( function ( $item, $index ) { 
							$item.index = $index;
							return $item;
						} );
					};

					$fn ( $data );
				};
			}, function ( $error ) {
				$fn ( $error );
			} );
		};
	};

} ) ( );