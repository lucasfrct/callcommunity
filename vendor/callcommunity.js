
$Date = getDateTime 

function getDateTime ( ) {
	var $date = { 
		Year : null,
		month : null, 
	};

	var d = new Date();
	$date.Year = d.getFullYear ( ); 
	$date.month =  ( '00' + ( d.getMonth ( ) + 1 ) ).slice ( -2 ); 
	$date.day =  ( '00' + d.getDate ( ) ).slice ( -2 ); 
	$date.hour = ( '00' + d.getHours ( ) ).slice ( -2 ); 
	$date.minute = ( '00' + d.getMinutes ( ) ).slice ( -2 ); 
	$date.second = ( '00' + d.getSeconds ( ) ).slice ( -2 );
	
	return $date;
};
