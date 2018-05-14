<?php 

#Service.php
include ( "Autoload.php" );

use Crud as ServiceCrud;
use NTP as ServiceNtp;

class Service
{
	private static $crud = null;

	private static function getList ( ): array
	{
		$query = [ 
			"action"=> "read", 
			"table"=> "tasks", 
			"fields"=> "*", 
			"condition"=> array ( 
				"dated"=> ServiceNtp::on ( )::$date, 
				"hour"=> strval ( explode( ":", ServiceNtp::on ( )::$time ) [ 0 ].":00" )
			) 
		];

		$response = [ ];

		self::$crud->digestJson ( json_encode ( $query ) );
		
		$result = ( isset ( self::$crud->run ( ) [ 0 ] ) ) ? self::$crud->run ( ) [ 0 ] : [ ] ;

		if ( !empty ( $result ) ) {		
			$response [ "audio" ] =  strval ( $result [ "audio" ] [ "uri" ] );
			$response [ "message" ] = strval ( $result [ "message" ] [ "text" ] );
		
			$response [ "contacts" ] = array_map ( function ( $item ) { 
				return strval ( $item [ "tel" ] );
			}, $result [ "contacts" ]);
		};

		return $response;
	}

	public static function on ( Crud $crud = null ) 
	{
		self::$crud = $crud;
		$list = self::getList ( );

		if ( !empty ( $list ) ) {
		
			print_r ( $list );
			/* ENVIAR PARA API ARRAY $list */
		
		};
	}
}

Service::on ( ServiceCrud::on ( ) );