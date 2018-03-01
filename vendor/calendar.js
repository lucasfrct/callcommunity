var $dom = { };

( function ( ) { 
	"use strict";

	$dom = $.extend ( $dom, {
		date: __resumeDay,
		mounth: __resumeMounth,
		task: __task,
	} );

	function __resumeDay (  $date = "", $week = "" ) {
		$( ".calendar-day-week > span" ).text ( $date );
		$( ".calendar-day-week > strong").text ( $week );
	};

	function __resumeMounth ( $mounth = "" ) {
		$( ".calendar-name").text( $mounth );
	};

	function __task ( $hour = "", $name = "" ) {
		$( ".calendar-day li[tabindex="+$hour+"]").text ( $name );
	};

} ) ( );


alert ( $Date ( ).week ); 

$dom.date ( "27", "ter" );
$dom.mounth ( "março" );

var $tasks = [ 
	{ hour: 8, name: "Tarefa 1", },
	{ hour: 12, name: "Tarefa 2", },
	{ hour: 16, name: "Tarefa 3", },
	{ hour: 17, name: "Tarefa 4", },
];

$tasks.forEach ( function ( $task ) {
	$dom.task ( $task.hour , $task.name );
} );


openTask ( );








function openCalendarDays ( ) {
	alert ("Open Calendar Days");
}

function openCalendarMonths ( ) {
	alert( "Open Calendar Months");
}

function openTask ( ) {
	$( ".calendar-day li[tabindex]" ).on ( "click", __getTask );
	
	function __getTask ( ) {

		var $hour = $( this ). attr ( "tabindex" );
		alert( "Open Calendar Task: "+$hour );

	};
	
}