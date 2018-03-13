( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.controller ( "calendar-task", CalendarTask );

	function CalendarTask ( $scope ) {

		$scope.toggle = false;
		$scope.date = $Date ( );

		$scope.task = {
			date: new Date( $scope.date.Year, $scope.date.month , $scope.date.day ),
			hour: "8:00",
			contacts: [
				{ name: "Lucas Costa", cel: "(12) 99128-5145", condominium: "Condomínio Cosrta Sol" },
				{ name: "Cristiane Costa", cel: "(12) 99128-5145", condominium: "Condomínio Cosrta Sol" },
				{ name: "Rafael Lírio", cel: "(12) 99128-5145", condominium: "Condomínio Cosrta Sol" },
			],
			repeat: { 
				dom: false,
				seg: false, 
				ter: false,
				qua: false, 
				qui: false,
				sex: false,
				sab: false,
			},
		};

		$scope.taskToggle = function ( $this ) {
			toggleClass ( ".calendar-task",  "active" );
		};

		$scope.taskSave = function ( ) {
			console.log ( $scope.task );
		};

		$scope.addContacts = function ( ) {

		};
	};

	function toggleClass ( $element, $class ) {
		document.querySelector ( $element ).classList.toggle ( $class );
	};

} ) ( );