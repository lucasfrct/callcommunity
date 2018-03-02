$Date = null;

( function ( ) {
	"use strict";

	// yyyy-mm-dd hh:mn:ss:ms | yy/mm/dd | hh:mn:ss | ms | dd/mm/yyyy
	var $d = { 
		Year: null, 
		year: null, 
		month: null,
		Month: null,
		day: null, 
		hour: null, 
		minute: null, 
		second: null, 
		milissecond: null,
		weekDay: null,
		week: null,
	};

	var $week = [ "dom", "seg", "ter", "qua", "qui", "sex", "sáb" ];
	var $months = [ "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez" ];

	$Date = __date;

	 function __date ( $format = null, $setWeek = [ ], $setMonths = [ ] ) {
		
	    var $date = new Date ( );
		var $resolve = null;

		$week = ( $setWeek.length > 0 ) ? $setWeek : $week;
		$months = ( $setMonths.length > 0 ) ? $setMonths : $months;
	    
	    $d.Year = Number ( $date.getFullYear ( ) );
		$d.year = Number ( String ( $d.Year ).substring ( 2 ) );
	    $d.month = String ( ( '00' + ( $date.getMonth ( ) + 1 ) ).slice ( -2 ) );
		$d.Month = String ( $months[ Number ( $date.getMonth ( ) ) ] );
	    $d.day = String ( ( '00' + $date.getDate ( ) ).slice ( -2 ) );
	    $d.hour = String ( ( '00' + $date.getHours ( ) ).slice ( -2 ) );
		$d.minute = String ( ( '00' + $date.getMinutes ( ) ).slice ( -2 ) );
		$d.second = String ( ( '00' + $date.getSeconds ( ) ).slice ( -2 ) );
		$d.milissecond = String ( ( '00' + $date.getMilliseconds ( ) ).slice ( -3 ) );
		$d.weekDay = Number ( $date.getDay ( ) );
		$d.week = String ( $week[ $d.weekDay ] );

		if ( $format == null || $format == "" ) {
			$resolve = $d;
		} else if ( $format.toLowerCase ( ).replace ( "-", "" ) == "datetime" ) {
			$resolve = __replaceDate ( "yyyy-mm-dd hh:mn:ss" );

		} else {
			$resolve = __replaceDate ( $format );
		};

	    return $resolve;
	};

	function __replaceDate ( $format = "yyyy/mm/dd" ) {
		return $format
			.toLowerCase ( )
			.replace ( "yyyy", $d.Year )
			.replace ( 'yy', $d.year )
			.replace ( 'mm', $d.month )
			.replace ( 'dd', $d.day )
			.replace ( 'hh', $d.hour )
			.replace ( 'mn', $d.minute )
			.replace ( 'ss', $d.second )
			.replace ( 'ms', $d.milissecond )
			.trim ( );
	};

} ) ( );