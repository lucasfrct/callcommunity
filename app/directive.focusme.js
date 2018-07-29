( function ( ) {
	"use stric";

	angular
		.module ( "callcommunity" )
		.directive ( "ngOnFocus", [ "$timeout", NgOnFocus ] );

	function NgOnFocus ( $timeout ) {
		return {
			restrict: "A",
			scope: { ngOnFocus: "=" },
			link: function ( $scope, $element ) {
				$scope.$watch ( "ngOnFocus", function ( $value ) {
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