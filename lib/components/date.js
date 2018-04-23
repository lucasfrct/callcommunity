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
	var $Week = [ "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado" ];
	var $months = [ "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez" ];

	$Date = __date;

	function __date ( $format = undefined, $setMonths = undefined, $setWeek = undefined, $set = undefined ) {
		var $resolve = null;
		var $date = { };

		if ( undefined === $format ) {
			$resolve = newDate ( );
		} else if ( 
			"string" === typeof $format
			&& - 1 === $format.indexOf ( "yy")
			&& - 1 === $format.indexOf ( "mm")
			&& - 1 === $format.indexOf ( "dd")
			&& - 1 === $format.indexOf ( "hh")
			&& - 1 === $format.indexOf ( "mn")
			&& - 1 === $format.indexOf ( "ss")
			&& - 1 === $format.indexOf ( "ms")
			&& - 1 === $format.indexOf ( "datetime" )
		) {
			
			$resolve = newDate ( parseDate ( $format ) );

		} else if ( "boolean" === typeof $format && true === $format  && "string" === typeof $setMonths ) {
			
			var $date =  parseDate ( $setMonths );
			$months = ( "object" === typeof $setMonths && $setMonths.length > 0 ) ? $setMonths : $months;
			$Week = ( "object" === typeof $setWeek && $setWeek$setWeek.length > 0 ) ? $setWeek : $Week;
			
			$resolve = parsedateToObj ( newDate ( $date ), $months, $week, $Week );
		}  else if ( "boolean" === typeof $format && true === $format  && "object" === typeof $setMonths ) {
			
			$months = ( "object" === typeof $setWeek && $setWeek.length > 0 ) ? $setWeek : $months;
			$Week = ( "object" === typeof $set && $set.length > 0 ) ? $set : $Week;
			
			$resolve = parsedateToObj ( newDate ( $setMonths ), $months, $week, $Week );
		} else if ( "boolean" === typeof $format && true === $format ) {
			
			$Week = ( "object" === typeof $setWeek && $setWeek$setWeek.length > 0 ) ? $setWeek : $Week;
			$months = ( "object" === typeof $setMonths && $setMonths.length > 0 ) ? $setMonths : $months;
			$resolve = parsedateToObj ( newDate ( ), $months, $week, $Week );

		} else if ( "string" === typeof $format && $format === "datetime" ) {
			
			$Week = ( "object" === typeof $setWeek && $setWeek$setWeek.length > 0 ) ? $setWeek : $Week;
			$months = ( "object" === typeof $setMonths && $setMonths.length > 0 ) ? $setMonths : $months;
			$resolve = __replaceDate ( parsedateToObj ( newDate ( ), $months, $week, $Week ), "yyyy-mm-dd hh:mn:ss" );

		} else if ( 
			"string" === typeof $format
			&& ( 
				-1 !== $format.indexOf ( "yy" )
				|| -1 !== $format.indexOf ( "mm" )
				|| -1 !== $format.indexOf ( "dd" )
				|| -1 !== $format.indexOf ( "hh" )
				|| -1 !== $format.indexOf ( "mn" )
				|| -1 !== $format.indexOf ( "ss" )
				|| -1 !== $format.indexOf ( "ms" )
				)
		) {
			
			$Week = ( "object" === typeof $setWeek && $setWeek$setWeek.length > 0 ) ? $setWeek : $Week;
			$months = ( "object" === typeof $setMonths && $setMonths.length > 0 ) ? $setMonths : $months;
			$resolve = __replaceDate ( parsedateToObj ( newDate ( ), $months, $week, $Week ), $format );

		};

	    return $resolve;
	};

	function newDate ( $date ) {
		if ( $date ) {
			return new Date ( $date );
		} else {
			return new Date ( );
		};
	};

	function parsedateToObj ( $date, $months, $week, $Week ) {
		var $d = { };
		
		$d.Year = Number ( $date.getFullYear ( ) );
		$d.year = Number ( String ( $d.Year ).substring ( 2 ) );
	    $d.month = String ( ( '00' + ( $date.getMonth ( ) + 1 ) ).slice ( -2 ) );
		$d.Month = String ( $months [ Number ( $date.getMonth ( ) ) ] );
	    $d.day = String ( ( '00' + $date.getDate ( ) ).slice ( -2 ) );
	    $d.hour = String ( ( '00' + $date.getHours ( ) ).slice ( -2 ) );
		$d.minute = String ( ( '00' + $date.getMinutes ( ) ).slice ( -2 ) );
		$d.second = String ( ( '00' + $date.getSeconds ( ) ).slice ( -2 ) );
		$d.milissecond = String ( ( '00' + $date.getMilliseconds ( ) ).slice ( -3 ) );
		$d.weekDay = Number ( $date.getDay ( ) );
		$d.week = String ( $week [ $d.weekDay ] );
		$d.Week = String ( $Week [ $d.weekDay ] );
		return $d;
	}

	function parseDate ( $date ) {
		return $date.replace ( /-0/g, "-" );
	};

	function __replaceDate ( $date, $format = "yyyy/mm/dd" ) {
		return $format
			.toLowerCase ( )
			.replace ( "yyyy", $date.Year )
			.replace ( 'yy', $date.year )
			.replace ( 'mm', $date.month )
			.replace ( 'dd', $date.day )
			.replace ( 'hh', $date.hour )
			.replace ( 'mn', $date.minute )
			.replace ( 'ss', $date.second )
			.replace ( 'ms', $date.milissecond )
			.trim ( );
	};

} ) ( );

var $date = { };
// $Date ( ) =  param undefinided = new date origin
// $Date ( "2018-01-02" ) = param string = new Date ( param ) new date orgin;
// $Date ( true ) = param boolean = date object
// $Date ( true, "2018-01-01" ) | return { Year:"", month: "", day:"" };
// $Date ( "datetime" );
// $Date ( "yyyy/mm/dd" ) = param string = date fromat in string

// $date = $Date ( "yyyy-mm-dd" );
// console.log ( $date );