( function () {
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "multimedia", Multimedia );

	function Multimedia ( $scope, $http ) {

		var $uri = "app/callserver/multimedia.json";

		$scope.multimedia = [ ];

		query ( $http, $uri, function ( $data ) { 
			$scope.multimedia = $data;
		} );
		
		$scope.multimediaCurrent = {
			title: "",
			uri: "",
			source: "",
			description: "",
			selected: "",
			index: null,
		};

		$scope.multimediaToggle = function ( ) {
			toggleClass ( ".audio.details", "active" );
			$scope.multimediaCurrent = { };
		};

		$scope.multimediaSave = function ( ) {
			if ( $scope.multimediaCurrent.index !== null && $scope.multimediaCurrent.index >= 0 ) {
				$scope.multimedia [ $scope.multimediaCurrent.index ] = angular.copy ( $scope.multimediaCurrent );
			} else {
				$scope.multimediaCurrent.index = null;
				$scope.multimedia.push ( angular.copy ( $scope.multimediaCurrent ) );
			};

			$scope.multimediaToggle ( );
			$scope.multimediaCurrent = { };
		};

		$scope.multimediaDelete = function ( ) {
			if ( $scope.multimediaCurrent.index !== null ) {
				$scope.multimedia.splice ( $scope.multimediaCurrent.index , 1 );
			};
			
			$scope.multimediaToggle ( );
			$scope.multimediaCurrent = { };
		};

		$scope.multimediaLoad = function ( $index ) {
			$scope.multimediaToggle ( );
			$scope.multimediaCurrent = $scope.multimedia [ $index ];
			$scope.multimediaCurrent.index = $index;
		};
	};

} ) ( );