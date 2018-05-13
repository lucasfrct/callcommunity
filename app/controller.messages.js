( function ( ) {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "messages", [ "$scope", "$http", "$cookies", "messages", Messages ] );

	function Messages ( $scope, $http, $cookies, $serviceMessages ) {

		$scope.messages = cookieGet ( $cookies, "messages" );

		$scope.$watch ( "messages", function ( $messages ) { 
			cookiePut ( $cookies, "messages", $messages );
		}, true );

		upRead ( $scope );

		$scope.$watch ( "upRead", function ( $up ) {
			$serviceMessages.read ( "*", function ( $data ) {
				$scope.messages = $data;
			} );
		}, true );

		$scope.messageCurrent = messageCurrentReset ( );

		$scope.messageToggle = function ( ) {
			toggleClass ( ".message", "active" );
			$scope.messageCurrent = messageCurrentReset ( );
		};

		$scope.messageSave = function ( ) {

			var $message = angular.copy ( $scope.messageCurrent );

			modalToggle ( );

			if ( $message.index !== null && $message.index >= 0 && $message.id >= 1 ) {

				$serviceMessages.update ( $message, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.messageToggle ( );
					};
					modalToggle ( 400 );
				} );

			} else if ( $message.index == null ) {
				$serviceMessages.create ( $message, function ( $data ) { 
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.messageToggle ( );
					};
					modalToggle ( 400 );
				} );

			};

		};

		$scope.messageDelete = function ( ) {
			
			var $message = angular.copy ( $scope.messageCurrent );

			modalToggle ( );

			var $delete = confirm ( "Deseja deletar esta mensagem?" );
			
			if ( $delete && $message.id >= 1 ) {
				$serviceMessages.delete ( $message, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.messageToggle ( );
					};
					modalToggle ( 400 );
				} );
			};
		};

		$scope.messageLoad = function ( $index ) {
			$scope.messageToggle ( );
			$scope.messageCurrent = $scope.messages[ $index ];
			$scope.messageCurrent.index = $index;
		};
	};

	function messageCurrentReset ( ) {
		return {
			index: null,
			id: null,
			title: "",
			text: "",
		};
	}

} ) ( );