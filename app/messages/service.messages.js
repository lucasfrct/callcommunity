( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "messages", [ "$http", ServiceMessages ] );
		
	function ServiceMessages ( $http ) {
		var $messages = this;

		var $uri = "lib/crud/Service.php";

		$messages.create = messageCreate;

		$messages.read = messageRead;

		$messages.update = messageUpdate;

		$messages.delete = messageDelete;		

		function messageCreate ( $message = null, $fn = null ) {
			var $create = { 
				action: "create", 
				table: "messages", 
				data: {
					title: $message.title,
					text: $message.text
				} 
			};

			query ( $create, $fn );
		};

		function messageRead ( $condition = null, $fn = null ) {
			var $read = { action: "read", table: "messages", fields: "*" };

			query ( $read, $fn );
		};

		function messageUpdate ( $message = null, $fn = null ) {
			var $update = { 
				action: "update", 
				table: "messages",
				id: $message.id,
				data: {
					title: $message.title,
					text: $message.text
				} 
			};

			query ( $update, $fn );
		};

		function messageDelete ( $messages = null, $fn = null ) {
			var $delete = { action: "delete", table: "messages", id: $messages.id };
			query ( $delete, $fn );
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

		return $messages;
	};

} ) ( );