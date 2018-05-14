<?php
#Service.php
include ( "Autoload.php" );

use Crud as ServiceCrud;

class Service
{
	private static $crud = null;

	private static function post ( ) 
	{

		if ( $_SERVER [ "REQUEST_METHOD"] == 'POST' ) {
			self::$crud->digestJson ( $_POST[ "callcommunity" ] );
			#echo $_POST[ "callcommunity" ];
			self::$crud->run ( );
			echo self::$crud->response ( );
		};
	}

	public static function on ( Crud $crud = null ) 
	{
		self::$crud = $crud;
		self::post ( );

	}
}

Service::on ( ServiceCrud::on ( ) );