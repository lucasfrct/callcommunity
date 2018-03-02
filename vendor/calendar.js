var $dom = { };

( function ( ) { 
	"use strict";

	$dom = $.extend ( $dom, {
		date: __resumeDay,
		mounth: __resumeMounth,
		task: __task,
		taskTitle: __taskTitle,
		getTask: $( ".calendar-day li[tabindex], .calendar-task .close" ),
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

	function __taskTitle ( $title = "" ) {
		$( ".calendar-task .calendar-task-header input" ).disabled = false;
		$( ".calendar-task .calendar-task-header input" ).val ( $title );
	}

} ) ( );


var $month = [
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
	"dezembro", 
];

var $tasks = [ 
	//{ hour: 8, name: "Tarefa 1", date:"2018-03-01",  },
];

var $currentDate = $Date ( "", [ ], $month );


$dom.date ( $currentDate.day, $currentDate.week );
$dom.mounth ( $currentDate.Month );

$tasks.forEach ( function ( $task ) {
	$dom.task ( $task.hour , $task.name );
} );

openTask ( );


function openTask ( ) {
	
	$dom.getTask.on ( "click", __getTask );
	
	function __getTask ( ) {
		
		var $hour = $( this ). attr ( "tabindex" );

	};
	
};

function openCalendarDays ( ) {
	console.log ("Open Calendar Days");
};

function openCalendarMonths ( ) {
	console.log ( "Open Calendar Months");
};