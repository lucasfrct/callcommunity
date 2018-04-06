( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "messages", [ "$scope", "$http", "$cookies", Messages ] );

	function Messages ( $scope, $http, $cookies ) {

		var $uri = "app/callserver/messages.json";

		$scope.messages = cookieGet ( $cookies, "messages" );

		$scope.$watch ( "messages", function ( $messages ) { 
			cookiePut ( $cookies, "messages", $messages );
		}, true );

		query ( $http, "app/callserver/messages.json", function ( $messages ) { 
			$scope.messages = $messages;
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
			var $delete = confirm ( "Deseja deletar esta mensagem?" );
			if ( $delete && $scope.messageCurrent.index !== null ) {
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