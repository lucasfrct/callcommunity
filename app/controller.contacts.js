( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "contacts", [ "$scope", "$http", "$cookies", Contacts ] );

	function Contacts ( $scope, $http, $cookies ) {

		var $uri =  "app/callserver/contacts.json";
		
		$scope.contacts = cookieGet( $cookies, "contacts" );

		$scope.$watch ( "contacts", function ( $contacts ) { 
			cookiePut( $cookies, "contacts", $contacts );
		}, true );

		query ( $http, "app/callserver/contacts.json", function ( $contacts ) { 
			$scope.contacts = $contacts;
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
				$scope.contacts[ $scope.contactCurrent.index ] = angular.copy ( $scope.contactCurrent );
			} else {
				$scope.contactCurrent.index = null;
				$scope.contacts.push ( angular.copy ( $scope.contactCurrent ) );
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

} ) ( );