( function ( ) {
	"use strict";
	angular
		.module ( "callcommunity" )
		.service ( "$session", [ "$location", SessionService ] );
	
	function SessionService ( $location ) {
		var $session = this;
		$session.set = sessionSet;
		$session.get = sessionGet;
		$session.check = sessionCheck;
		$session.kill = sessionKill;
		$session.redirect = sessionRedirect;
		$session.cleanAll = deleteAllCookies;

		function sessionSet ( $session = null, $hour = 4 ) {
			var $date = new Date ( );
			$date.setTime ( $date.getTime ( ) + ( $hour * 60 * 60 * 1000 ) );
  			var $expires = "expires="+ $date.toUTCString ( );
			document.cookie =  "session" + "=" + $session + ";" + $expires + ";path=/";
		};

		function sessionGet ( ) {
			var $name = "session=";
			var $decodedCookie = decodeURIComponent ( document.cookie );
			var $ca = $decodedCookie.split ( ';' );
			
			for ( var $i = 0; $i < $ca.length; $i++ ) {
				var $c = $ca [ $i ];
				
				while ( $c.charAt ( 0 ) == ' ' ) {
  					$c = $c.substring ( 1 );
				};

				if ( $c.indexOf ( $name ) == 0 ) {
  					return $c.substring ( $name.length, $c.length );
				};
			};

			return "";
		};

		function sessionCheck ( ) {
			var $sessionCheck = sessionGet ( );
			if ( $sessionCheck.length >= 1 ) {
				sessionSet ( $sessionCheck, ( 0.017 * 5 ) ); // 2 horas
			} else {
				sessionRedirect ( "/login" );
			};
		};

		function sessionKill ( ) {
			document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		};

		function sessionRedirect ( $url = "" ) {
			$location.path ( $url );
		};

		function deleteAllCookies ( ) {
		    var $cookies = document.cookie.split ( ";" );
		    for ( var $i = 0; $i < $cookies.length; $i++ ) {
		        var $cookie = $cookies [ $i ];
		        var $eqPos = $cookie.indexOf ( "=" );
		        var $name = $eqPos > -1 ? $cookie.substr ( 0, $eqPos ) : $cookie;
		        $session.ck = $name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		    };
		};
	};

} ) ( );