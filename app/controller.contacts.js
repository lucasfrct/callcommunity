( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "contacts", [ "$scope", "$http",  Contacts ] );

	function Contacts ( $scope, $http ) {

		var $uri =  "app/callserver/contacts.json";
		
		$scope.contacts = [ ];

		query ( $http, $uri, function ( $data ) {
			$scope.contacts = $data;
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
			if ( $scope.contactCurrent.index !== null ) {
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