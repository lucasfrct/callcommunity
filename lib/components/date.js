var $Date = { };

( function ( ) {
	"use strict";

/***********************************	
	y: 19 _____________(number) 
	Y: 2019 ___________(number)
	year: "19" ________(string)
	Year: "2019" ______(string)
	
	m: 1 ______________(number)
	M: "01" ___________(string)
	month: "jan" ______(string)
	Month: "janeiro" __(string)
	
	d: 1 ______________(number)
	D: "01" ___________(string)
	day: "01" _________(string)
	
	w: 1 ______________(number)
	W: "D" ____________(string)
	week: "dom" _______(string)
	Week: "domingo" ___(string)

	* Número de dias do mês *
	days: 31 __________(number)
	n: 31 _____________(number)

	h: 1 ______________(number)
	mn: 1 _____________(number)
	s: 1 ______________(number)
	ms: 1 _____________(number)
	
	hour: "01" ________(string)
	minute: "01" ______(string)
	second: "01" ______(string)
	milissecond: "001" (string)
************************************/

	var $Week = [ "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado" ];
	var $Months = [ 
		"janeiro", 
		"fevereiro", 
		"março", 
		"abril", 
		"maio", 
		"junho", 
		"julho", 
		"agosto", 
		"setembro", 
		"outubro", 
		"novembro", 
		"dezembro" 
	];

	$Date = __date;

	function __date ( $params = null ) {
		
		var $resolve = { };

		if ( null === $params ) {
			$resolve = __parseDateOriginToObj ( __newDateOrigin ( ) );
		} else if ( true === $params ) {
			$resolve = __newDateOrigin ( );
		} else if (
			"string" === typeof $params
			&& -1 === $params.indexOf ( "y")
			&& -1 === $params.indexOf ( "m")
			&& -1 === $params.indexOf ( "d")
			&& -1 === $params.indexOf ( "w")
			&& -1 === $params.indexOf ( "n")
			&& -1 === $params.indexOf ( "h")
			&& -1 === $params.indexOf ( "m")
			&& -1 === $params.indexOf ( "s")
			&& -1 === $params.indexOf ( "datetime" )
		) {
			$resolve = __parseDateOriginToObj ( __newDateOrigin ( $params ) );
		} else {
			$resolve = __replaceDate ( __parseDateOriginToObj ( __newDateOrigin ( ) ), $params );
		};
		
	    return $resolve;
	};

	function __newDateOrigin ( $params = null ) {
		return ( null === $params ) ? new Date ( ) : new Date ( $params );
	};

	function __parseDateOriginToObj ( $dateOrigin ) {
		var $d = { };
		var $indexWeek = 0; 
		
		$d.Y = Number ( $dateOrigin.getFullYear ( ) );
		$d.Year = String ( $d.Y  );
		$d.year = $d.Year.substring ( 2 );
		$d.y = Number ( $d.year );
		
		$d.m = Number ( $dateOrigin.getMonth ( ) + 1 );
	    $d.M = String ( "00" + ( $d.m ) ).slice ( -2 );
		$d.Month = String ( $Months [ ( $d.m - 1 ) ] );
	    $d.month = __returnTreeCharacters ( $d.Month );

	    $d.d = $dateOrigin.getDate ( );
	    $d.D = String ( ( '00' + $d.d ).slice ( -2 ) );
	    $d.day = $d.D;


	    $d.w = ( $dateOrigin.getDay ( ) + 1 );
		$d.Week = $Week [ ( $d.w - 1 ) ];
		$d.week = __returnTreeCharacters ( $d.Week ); 
	    $d.W = $d.week.charAt ( 0 ).toUpperCase ( );
		
		$d.days = __daysOfMonth ( $d.m, $d.y );
		$d.n = $d.days;

		$d.h = $dateOrigin.getHours ( );
		$d.mn = $dateOrigin.getMinutes ( );
		$d.s = $dateOrigin.getSeconds ( );
		$d.ms = $dateOrigin.getMilliseconds ( );
		
	    $d.hour = String ( ( '00' + $d.h ).slice ( -2 ) );
		$d.minute = String ( ( '00' + $d.mn ).slice ( -2 ) );
		$d.second = String ( ( '00' + $d.s ).slice ( -2 ) );
		$d.milissecond = String ( ( '00' +  $d.ms ).slice ( -3 ) );

		$d.calendar = __calendar; 

		return $d;
	};

	function __replaceDate ( $dateObj = { }, $format = "yyyy/mm/dd" ) {
		return $format
			.toLowerCase ( )
			.replace ( "yyyy", $dateObj.Year )
			.replace ( 'yy', $dateObj.year )
			.replace ( 'mmmm', $dateObj.Month )
			.replace ( 'mmm', $dateObj.month )
			.replace ( 'mm', $dateObj.M )
			.replace ( 'dd', $dateObj.day )
			.replace ( 'wwww', $dateObj.Week )
			.replace ( 'ww', $dateObj.week )
			.replace ( 'w', $dateObj.W )
			.replace ( 'n', $dateObj.days )
			.replace ( 'hh', $dateObj.hour )
			.replace ( 'mn', $dateObj.minute )
			.replace ( 'ss', $dateObj.second )
			.replace ( 'ms', $dateObj.milissecond )
			.trim ( );
	};

	function __returnTreeCharacters ( $str = "" ) {
		return $str.substring ( 0, 3 );
	};

	function __mapArrayTreeCharacters ( $array = [ ] ) {
		return $array.map ( function ( $item ) {
			return __returnTreeCharacters ( $item );
		} );
	};

	function __daysOfMonth ( $numberMonth = 1, $numberYear = 1970 ) {
		var $days = new Date ( Number ( $numberYear ), Number ( $numberMonth ), 0 );
		return $days.getDate ( );
	};

	function __calendar ( $numberYear = 1970, $numberMonth = 1 ) {

		var $format = String ( $numberYear+"/"+$numberMonth+"/1" );
		
		var $currentMonth = __parseDateOriginToObj ( __newDateOrigin ( $format ) );

		var $monthCurrent = {
			year: $currentMonth.Y,
			m: $currentMonth.m,
			week: $currentMonth.w,
			max: $currentMonth.days,
			days: __gerateDays ( 1, $currentMonth.days ),
		};

		var $monthBefore = {
			year: ( $monthCurrent.m == 1 ) ? ( $monthCurrent.year - 1 ) : $monthCurrent.year,
			m: ( $monthCurrent.m == 1 ) ? 12 : ( $monthCurrent.m - 1 ),
			week: 1,
			max: 0,
			days: [],
		};

		var $monthAfter = {
			year: ( $monthCurrent.m == 12 ) ? ( $monthCurrent.year + 1 ) : $monthCurrent.year,
			m: ( $monthCurrent.m == 12 ) ? 1 : ( $monthCurrent.m + 1 ),
			week: 0,
			max: 0,
			days: [ ] ,
		};

		$monthBefore.max = __daysOfMonth ( $monthBefore.m, $monthBefore.year );
 
		$monthBefore.days = __gerateDays ( ( $monthBefore.max - ( $monthCurrent.week - 2 ) ), $monthBefore.max );

		$monthAfter.days = ( 42 - ( $monthCurrent.days.length + $monthBefore.days.length ) );

		$monthAfter.days = __gerateDays ( 1, $monthAfter.days );	

		return {
			month: $currentMonth.Month,
			week: $Week.map ( __weekLetter ),
			before: $monthBefore,
			current: $monthCurrent,
			after: $monthAfter,
		};
	};

	function __weekLetter ( $day ) {
		return $day.charAt ( 0 ).toUpperCase ( );
	};

	function __gerateDays ( $init, $end ) {
		var $arrayDays = [ ];
		for ( var $i = $init; $i <= $end; $i++ ) {
			$arrayDays.push ( $i );
		};
		return $arrayDays;
	};

} ) ( );