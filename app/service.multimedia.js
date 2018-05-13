( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "multimedia", [ "$http", ServiceMultimedia ] );
		
	function ServiceMultimedia ( $http ) {
		var $multimedia = this;

		var $uri = "lib/crud/Service.php";

		$multimedia.create = audioCreate;

		$multimedia.read = audioRead;

		$multimedia.update = audioUpdate;

		$multimedia.delete = audioDelete;		

		function audioRead ( $condition = null, $fn = null ) {
			var $read = { action: "read", table: "multimedia", fields: "*" };

			query ( $read, $fn );
		};

		function audioCreate ( $audio = null, $fn = null ) {
			var $create = { 
				action: "create", 
				table: "multimedia", 
				data: {
					title: $audio.title,
					description: $audio.description,
					uri: $audio.uri
				} 
			};

			query ( $create, $fn );
		};

		function audioUpdate ( $audio = null, $fn = null ) {
			var $update = { 
				action: "update", 
				table: "multimedia",
				id: $audio.id,
				data: {
					title: $audio.title,
					description: $audio.description,
					uri: $audio.uri
				} 
			};

			query ( $update, $fn );
		};

		function audioDelete ( $audio = null, $fn = null ) {
			var $delete = { action: "delete", table: "multimedia", id: $audio.id };
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

		return $multimedia;
	};

} ) ( );