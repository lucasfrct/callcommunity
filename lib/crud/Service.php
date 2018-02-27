<?php
#Service.php
include ( "Autoload.php" );

class Service
{
	private static $connect = null;
	private static $modeldata = null;
	private static $crud = null;

	private static function post ( ) {

		if ( $_SERVER [ "REQUEST_METHOD" ] == 'POST' ) {
			self::$crud->digestJson ( json_encode ( $_POST ) );
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

Service::on ( Crud::on ( Connect::on ( ), Modeldata::on ( ) ) );