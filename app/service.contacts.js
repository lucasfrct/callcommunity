( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "contacts", [ "$http", ServiceContacts ] );
	
	function ServiceContacts ( $http ) {

		var $contacts = this;

		var $uri = "lib/crud/Service.php";	

		$contacts.create = contactCreate;

		$contacts.read = contactRead;
		
		$contacts.update = contactUpdate;
		
		$contacts.delete = contactDelete;

		function contactCreate ( $contact = null, $fn = null ) {
		
			var $create = { 
				action: "create", 
				table: "contacts",
				data: {
					name: $contact.name,
					tel: $contact.tel,
					condominium: $contact.condominium
				}
			};

			query ( $create, $fn );
		};

		function contactRead ( $condition = null, $fn = null ) {

			var $read = { action: "read", table: "contacts", fields: "*" };

			query ( $read, $fn );
		};

		function contactUpdate ( $contact = null, $fn = null ) {

			var $update = { 
				action: "update",
				table: "contacts",
				id: $contact.id,
				data: { 
					name: $contact.name, 
					tel: $contact.tel,
					condominium: $contact.condominium
				}
			};

			query ( $update, $fn );
		};

		function contactDelete ( $contact = null, $fn = null ) {
			
			var $delete = { action: "delete", table: "contacts", id: $contact.id };

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
	};

} ) ( );