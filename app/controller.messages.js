( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "messages", Messages );

	function Messages ( $scope, $http ) {

		var $uri = "app/callserver/messages.json";

		$scope.messages = [ ];

		query ( $http, $uri, function ( $data ) { 
			$scope.messages = $data;
		} );

		$scope.messageCurrent = {
			title: "",
			text: "",
			index: null,
		};

		$scope.messageToggle = function ( ) {
			toggleClass ( ".message", "active" );
			$scope.messageCurrent = { };
		};

		$scope.messageSave = function ( ) {
			if ( $scope.messageCurrent.index !== null && $scope.messageCurrent.index >= 0 ) {
				$scope.messages[ $scope.messageCurrent.index ] = angular.copy ( $scope.messageCurrent );
			} else {
				$scope.messageCurrent.index = null;
				$scope.messages.push ( angular.copy ( $scope.messageCurrent ) );
			};

			$scope.messageToggle ( );
			$scope.messageCurrent = { };
		};

		$scope.messageDelete = function ( ) {
			if ( $scope.messageCurrent.index !== null ) {
				$scope.messages.splice ( $scope.messageCurrent.index , 1 );
			};
			
			$scope.messageToggle ( );
			$scope.messageCurrent = { };
		};

		$scope.messageLoad = function ( $index ) {
			$scope.messageToggle ( );
			$scope.messageCurrent = $scope.messages[ $index ];
			$scope.messageCurrent.index = $index;
		};
	};

} ) ( );