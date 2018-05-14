( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "contacts", [ "$scope", "$http", "$cookies", "contacts", Contacts ] )

	function Contacts ( $scope, $http, $cookies, $serviceContacts ) {
		
		$scope.contacts = cookieGet( $cookies, "contacts" );

		$scope.$watch ( "contacts", function ( $contacts ) { 	
			cookiePut( $cookies, "contacts", $scope.contacts );
		}, true );

		upRead ( $scope );

		$scope.$watch ( "upRead", function ( $up ) {
			$serviceContacts.read ( "*", function ( $data ) {
				$scope.contacts = $data;
			} );
		}, true );
		

		$scope.contactCurrent = contactCurrentReset ( );

		$scope.contactToggle = function ( ) {
			toggleClass ( ".contact", "active" );
			$scope.contactCurrent = contactCurrentReset ( );
		};

		$scope.contactLoad = function ( $contact ) {
			$scope.contactToggle ( );
			$scope.contactCurrent = angular.copy ( $contact );
		};

		$scope.contactSave = function ( ) {
			
			var $contact = angular.copy ( $scope.contactCurrent );

			modalToggle ( );

			if ( $contact.index !== null && $contact.index >= 0 && $contact.id >= 1 ) {

				$serviceContacts.update ( $contact, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.contactToggle ( );
					};

					modalToggle ( 400 );
				} );

			} else if ( $contact.index == null ) {

				$serviceContacts.create ( $contact , function ( $data ) {
					console.log ( $data );
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.contactToggle ( );
					};

					modalToggle ( 400 );
				} );
			};
		};

		$scope.contactDelete = function ( ) {
			
			var $contact = angular.copy ( $scope.contactCurrent );

			modalToggle ( );
			
			var $delete = confirm ( 'Deseja deletar o contato"'+$contact.name+'"?' );

			if ( $delete && $contact.id >= 1 ) {
				$serviceContacts.delete ( $contact, function ( $data ) { 
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.contactToggle ( );
					};

					modalToggle ( 400 );
				} );
			};
		};
	};

	function contactCurrentReset ( ) {
		return {
			index: null,
			id: null,
			name: "",
			tel: "",
			condominium: "",
		};
	};

} ) ( );