( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "multimedia", [ "$scope", "$http", "$cookies", "multimedia", Multimedia ] );

	function Multimedia ( $scope, $http, $cookies, $serviceMultimedia ) {

		$scope.multimedia = cookieGet ( $cookies, "multimedia" );
		
		$scope.$watch ( "multimedia", function ( $multimedia ) { 
			cookiePut ( $cookies, "multimedia", $multimedia );
		}, true );

		upRead ( $scope );

		$scope.$watch ( "upRead", function ( $up ) {
			$serviceMultimedia.read ( "*", function ( $data ) {
				$scope.multimedia = $data;
			} );
		}, true );

		
		$scope.multimediaCurrent = multimediaCurrentReset ( );

		$scope.multimediaToggle = function ( ) {
			toggleClass ( ".audio.details", "active" );
			$scope.multimediaCurrent = multimediaCurrentReset ( );
		};

		$scope.multimediaSave = function ( ) {

			var $multimedia = angular.copy ( $scope.multimediaCurrent );

			modalToggle ( );
			
			if ( $multimedia.index !== null && $multimedia.index >= 0 && $multimedia.id >= 1 ) {

				$serviceMultimedia.update ( $multimedia, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.multimediaToggle ( );
					};
					modalToggle ( 400 );
				} );

			} else if ( $multimedia.index == null ){

				$serviceMultimedia.create ( $multimedia, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope );
						$scope.multimediaToggle ( );
					};
					modalToggle ( 400 );
				} );
			};
		};

		$scope.multimediaDelete = function ( ) {

			modalToggle ( );
			
			var $multimedia = angular.copy ( $scope.multimediaCurrent );

			var $delete = confirm ( 'deseja deletar o áudio "'+$multimedia.title+'"?' );
			
			if ( $delete && $multimedia.id >= 1 ) {
				$serviceMultimedia.delete ( $multimedia, function ( $data ) {
					if ( $data == "true" ) {
						upRead ( $scope )
						$scope.multimediaToggle ( );
					};
					modalToggle ( 400 );
				} );
			};
		};

		$scope.multimediaLoad = function ( $multimedia ) {
			$scope.multimediaToggle ( );
			$scope.multimediaCurrent = angular.copy ( $multimedia );
		};
	};

	function multimediaCurrentReset ( ) {
		return  {
			index: null,
			id: null,
			title: "",
			uri: null,
			source: null,
			description: "",
			selected: "",
		};
	};

} ) ( );