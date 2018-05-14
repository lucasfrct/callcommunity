<?php 

/*
server 0.south-america.pool.ntp.org
server 1.south-america.pool.ntp.org
server 2.south-america.pool.ntp.org
server 3.south-america.pool.ntp.org
*/

class NTP 
{
	private static $instance = NULL;
	private $url = "time-b.timefreq.bldrdoc.gov";

	private $server = NULL;
	public static $date = "";
	public static $time = "";
	
	public static $report = array ( );
	
	private function getServer ( ) 
	{ 
		try {
			$server = @fsockopen ( self::$instance->url, 13, $errno, $errstr );
			if ( !$server ) {
				array_push ( self::$report, "No response Server" );
			} else {
				array_push ( self::$report, "On response Server" );
				self::$instance->server = fread ( $server, 50 ); 
		    	fclose ( $server );	
			};
			
		} catch ( Exception $e ) {
			array_push ( self::$report, "On response Server > ".$e );
		};
	}

	private function getDate ( ) 
	{
		if ( preg_match ("/\s+\d+-\d+-\d+\s+/", self::$instance->server, $matches ) ) {
			self::$date = strval ( implode ( 
				"-", array_map ( function ( $item ) { 
						return intval ( $item ); 
					}, explode ( 
						"-", "20".trim ( $matches [ 0 ] ) 
					) 
				) 
			) );
			array_push ( self::$report, "Get date" );
		};
		return self::$date;
	}

	private function getHour ( ) 
	{
		if ( preg_match ("/\s+\d+:\d+:\d+\s+/", self::$instance->server, $matches ) ){
		 	
		 	$time = array_map ( function ( $item ) {
		 		return intval ( $item );
		 	}, explode ( ":", trim ( $matches [ 0 ] ) ) );

		 	$time[0] = ( $time[0] - 3 );

		 	self::$time = strval ( implode ( ":", $time ) );

		 	array_push ( self::$report, "Get Hour" );
		 };
		 return self::$time;
	}

	public static function on ( ) {
		if ( NULL == self::$instance ) {
			self::$instance = new self;
		};

		self::$instance->getServer ( );
		self::$instance->getDate ( );
		self::$instance->getHour ( );

		return self::$instance;
	}
};

/*
echo NTP::on ( )::$;
echo NTP::on ( )::$time;
*/