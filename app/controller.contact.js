( function () {
	"use strict";

	angular.module ( "callcommunity" )
		.controller ( "contact", Contact );

	function Contact ( $scope ) {

		$scope.edit = false;

		$scope.contactCurrent = {
			name: "",
			condominium: "",
			tel: "",
			index: null,
		};

		$scope.contacts = [
			//{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Lucas Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
			{ name: "Cristiane Costa", tel: "(12) 99128-5145", condominium: "Condomínio Costa Sol, Bl 14B Ap 1023A", selected: false, },
		];

		$scope.contactToggle = function ( ) {
			toggleClass ( ".contacts-details", "contacts-active" );
			$scope.contactCurrent = { };
		};

		$scope.contactSave = function ( ) {
			if ( $scope.contactCurrent.index >= 0 ) {
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
			$scope.edit = true;
			$scope.contactToggle ( );
			$scope.contactCurrent = $scope.contacts[ $index ];
			$scope.contactCurrent.index = $index;
		};
	};

} ) ();