( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "contacts", [ "$scope", "$http", "$cookies", Contacts ] );

	function Contacts ( $scope, $http, $cookies ) {

		var $uri =  "app/callserver/contacts.json";
		
		$scope.contacts = cookieGet( $cookies, "contacts" );

		$scope.$watch ( "contacts", function ( $contacts ) { 	
			contactRead ( $http, "*", function ( $data ) {
				$scope.contacts = $data;
				cookiePut( $cookies, "contacts", $scope.contacts );
			} );
		}, true );

		query ( $http, "app/callserver/contacts.json", function ( $contacts ) { 
			//$scope.contacts = $contacts;
		} );

		

		$scope.contactCurrent = {
			name: "",
			condominium: "",
			tel: "",
			index: null,
		};

		$scope.contactToggle = function ( ) {
			toggleClass ( ".contact", "active" );
			$scope.contactCurrent = { };
		};

		$scope.contactSave = function ( ) {
			if ( $scope.contactCurrent.index !== null && $scope.contactCurrent.index >= 0 ) {
				console.log ( "init update" );
				//$scope.contacts[ $scope.contactCurrent.index ] = angular.copy ( $scope.contactCurrent );
			} else {
				contactCreate ( $http, angular.copy ( $scope.contactCurrent ), function ( $data ) {
					$scope.contactCurrent.index = null;
					$scope.contacts.push ( angular.copy ( $scope.contactCurrent ) );
				} );
			};

			$scope.contactToggle ( );
			$scope.contactCurrent = { };
		};

		$scope.contactDelete = function ( ) {
			var $delete = confirm ( 'Deseja deletar o contato"'+$scope.contactCurrent.name+'"?' );

			if ( $delete && $scope.contactCurrent.index !== null ) {
				$scope.contacts.splice ( $scope.contactCurrent.index , 1 );
			};
			
			$scope.contactToggle ( );
			$scope.contactCurrent = { };
		};

		$scope.contactLoad = function ( $index ) {
			$scope.contactToggle ( );
			$scope.contactCurrent = $scope.contacts[ $index ];
			$scope.contactCurrent.index = $index;
		};
	};

	function contactCreate ( $http = null, $contact = null, $fn = null ) {
		var $uri = "lib/crud/Service.php";

		var $create = { 
			action: "create",
			table: "contacts",
			data: { 
				name: $contact.name, 
				tel: $contact.tel,
				condominium: $contact.condominium
			}
		};

		$http ( {
			url: $uri,
			method: "POST",
			data: "callcommunity="+JSON.stringify ( $create ),
			headers : { 'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8" },
			responseType: 'text',
		} )
		.then ( function ( $data ) {
			if ( null !== $fn ) {
				$fn ( $data.data );
			};
		}, function ( $error ) {
			$fn ( $error );
		} );
	};

	function contactRead( $http = null, $condition = null, $fn = null ) {
		var $uri = "lib/crud/Service.php";

		var $read = { 
			action: "read",
			table: "contacts", 
			fields: "*",
			id: "",
		};
		
		$http ( {
			url: $uri,
			method: "POST",
			data: "callcommunity="+JSON.stringify ( $read ),
			headers : { 'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8" },
			responseType: 'text',
		} )
		.then ( function ( $data ) {
			if ( null !== $fn ) {
				$fn (  $data.data );
			};
		}, function ( $error ) {
			$fn ( $error );
		} );
	};


} ) ( );