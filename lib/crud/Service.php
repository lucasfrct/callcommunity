<?php
#Service.php
include ( "autoload.php" );

use Connect as serviceConnect;
use Crud as serviceCrud;
use ICrud as interfaceCrud;
use Modeldata as serviceModeldata;

class Service
{
	private static $modeldata = null;

	public static function on ( $modeldata = null ) 
	{
		self::$modeldata = $modeldata;
	}

	public static function requestPost (  ) 
	{
		if ( $_SERVER [ "REQUEST_METHOD"] == 'POST' ) {
			echo json_encode ( self::$modeldata->digest ( json_encode ( $_POST ) ) );
		};
	}
};

Service::on ( new serviceModeldata ( serviceCrud::on ( serviceConnect::on ( "127.0.0.1:3306", "root", "", "test" ) ) ) );
Service::requestPost ( );