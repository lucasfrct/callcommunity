( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.component ( "loginView", LoginView ( ) );

	function LoginView ( ) {
		return {
			template: 
				'<link rel="stylesheet" type="text/css" href="app/login/login.css">'
				+'<form class="login-form">'
					+'<h4 class="login-title">Gss Technology</h4>'
					+'<h2 class="login-name">{{login.user}}</h2>'
					+'<div class="login-email" data-letter="{{ login.email[0] }}" ng-show="login.email">{{ login.email }}</div>'
					+'<div class="login-data">'
						+'<input type="{{(toggles.statusShow && login.email ) ? \'password\' : \'text\';}}" placeholder="{{login.placeholder}}" ng-model="login.data" >'
						+'<span ng-show="login.email" ng-click=" showPassword ( );"></span>'
					+'</div>'
					+'<div class="login-details">'
						+'<span ng-click="recoverPassword ( )">Esquceu-se da palavra-passe?</span>'
						+'<button type="submit" ng-click="next ( ); ">Seguinte</button>'
					+'</div>'
				+'</form>'

			, controller: [ "$scope", "$loginservice", LogionController ],
		};
	};

	function LogionController ( $scope, $loginservice ) {
		$scope.showPassword = showPassword;
		$scope.recoverPassword = recoverPassword;
		$scope.next = next;
		
		$scope.element = document.querySelector ( ".login-data" );
		$scope.form = document.querySelector ( ".login-form" );
		$scope.toggles = {
			statusEmail: true,
			statusPassword: true,
			statusShow: true,
		};

		$scope.login = {
			user: "",
			email: "",
			msg: [ "Introduza o email", "Introduza a palavra-passe" ],
			placeholder: "Introduza o email" ,
			password: "",
			data: "",
		};

		function showPassword ( ) {
			$scope.toggles.statusShow = ( $scope.toggles.statusShow ) ? false : true;
		};

		function recoverPassword ( ) {
			console.log ( "recover password" );
		};

		function next ( ) {
			if ( !$scope.login.email && $scope.login.data ) { checkEmail ( ); };
			if ( $scope.login.email && $scope.login.data ) { checkPassword ( ); };
		};

		function checkEmail ( ) {
			setload ( );

			$scope.login.email = $scope.login.data;
			$scope.login.data = "";

			$loginservice.email ( $scope.login.email, function ( $data ) {
				if ( $data.email == $scope.login.email ) {
					$scope.login.user = $data.user;
					$scope.login.placeholder = $scope.login.msg [ 1 ];
					setElement ( );
				} else {
					$scope.login.email = "";
					setInvalid ( );
				};
			} );
		};

		function checkPassword ( ) {
			setload ( );

			$scope.login.pasword = $scope.login.data;
			$scope.login.data = "";

			$loginservice.password ( $scope.login.email, $scope.login.pasword, function ( $data ) { 
				
				if ( $data.session == "001" ) {
					loginathorized ( );
					setElement ( );
				} else {
					$scope.login.pasword = "";
					setInvalid ( );
				};

			} );
		};

		function setElement ( ) {
			$scope.element.setAttribute ( "class", "login-data" );
		}

		function setload ( ) {
			$scope.element.setAttribute ( "class", "login-data load" );
		};

		function setInvalid ( ) {
			$scope.element.setAttribute ( "class", "login-data invalid error" );
			setTimeout ( function ( ) {
				$scope.element.setAttribute ( "class", "login-data error" );
			}, 1000 );
		};

		function loginathorized ( ) {
			$scope.form.setAttribute ( "class", "login-form login-authorized" )
		};
	};
} ) ( );