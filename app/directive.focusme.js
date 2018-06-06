( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.directive ( "ngFocusOn", [ "$timeout", NgFocusOn ] );

	function NgFocusOn ( $timeout ) {
		return {
			restrict: "A",
			scope: { ngFocusOn: "=" },
			link: function ( $scope, $element ) {
				$scope.$watch ( "ngFocusOn", function ( $value ) {
					if ( $value ) {
						$timeout ( function ( ) {
							$element [ 0 ].focus ( );
						}, 1 );
					};
				} );
			},
		};
	};

} ) ( );