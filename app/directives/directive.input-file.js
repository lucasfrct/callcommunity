( function ( ) {
	"use strict";

	angular
		.module ( "callcommunity" )
		.directive ( "inputfile", InputFile );

	function InputFile ( $rootScope ) {
	  return {
	  	replace: true,
	    require: "ngModel",
	    link: function postLink ( $scope, $element, $attrs, $ngModel ) {
	    	$element.on ( "change", function ( $event ) {
	    		
	    		var $source = $element [ 0 ].files [ 0 ];
	    		var $uri = "multimedia/"+$source.name;
	    		
	    		$ngModel.$setViewValue ( $uri );

	    		$scope.$apply ( function ( ) {
	    			$scope.multimediaCurrent.source = $source;
	    		} );

	    		$element [ 0 ].value = null;
	    	} );
	    },
	  }
	};

} ) ( );

