<?php 
$handle = fsockopen("time-b.timefreq.bldrdoc.gov", 13, $errno, $errstr); 

if ( !$handle ) { 
    print "ERROR: $errno - $errstr<br>\n"; 
} else { 

    $daytime = fread ( $handle, 50 ); 
    fclose ( $handle ); 
    if ( preg_match("/\s+\d+-\d+-\d+\s+/", $daytime, $matches ) ) $date = $matches [ 0 ]; 
    if ( preg_match("/\s+\d+:\d+:\d+\s+/", $daytime, $matches ) ) $time = $matches [ 0 ]; 

	#print $daytime.'<br >'; 
	#print $date.'<br>'; 
	#print $time.'<br>'; #(-3)
    echo $daytime;
};