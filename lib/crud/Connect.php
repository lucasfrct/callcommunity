<?php
#Connect.php

class Connect 
{

	# Instância única 
	private static $instance = null;
	public static $message = Array ( );
	public static $exception = Array ( );
	private $host = array( "host"=> "127.0.0.1", "port"=> "3306", "user"=> "root", "password"=> "" );
	private $database = "callcommunity";
	#private $host = array( "host"=> "mysql.hostinger.com.br", "port"=> "", "user"=> "u339404720_call", "password"=> "callcommunity" );
	#private $database = "u339404720_call";
	private $mysqli = null;

	# Testa se o servidor esta online
	private function onServer ( string $host = "", string $port = "" ) : bool 
	{
		$onServer = false;

		try {
			$server = @fsockopen ( $host, $port, $errCode, $errStr, 1 );
			
			if ( $server == true ) {
				@fclose ( $server );
				$onServer = true;
				array_push( self::$message, "Server On: ".$host.":".$port );
			} else {
				$onServer = false;
				array_push( self::$message, "Server Off: ".$host.":".$port );
			};

		} catch ( Exception $error ) {
            array_push ( self::$exceptions, $error );
		};

		return $onServer;
	}

	# Abre connecxão Mysqli
	private function open ( ) 
	{

		try {
			 $Mysqli = @new \Mysqli (
				self::$instance->host [ "host" ].":".self::$instance->host [ "port" ], 
				self::$instance->host [ "user" ], 
				self::$instance->host [ "password" ], 
				self::$instance->database 
			);
			
			if ( !$Mysqli->connect_errno && !$Mysqli->connect_error ) {
				self::$instance->mysqli = $Mysqli;
				self::$instance->mysqli->set_charset( "utf8" );
				array_push ( self::$message, "Open Connect Mysqli." );
			} else {
				array_push ( self::$message, "Error Connect Mysqli: ".$Mysqli->connect_errno );
				array_push ( self::$message, "Error Connect Mysqli: ".$Mysqli->connect_error );
			};

		} catch ( Exception $exception ) {
			array_push ( self::$exception, $exception );
		};

		return self::$instance->mysqli;
	}

	# inicia uma instancia da classe ConnectMysqli
	public static function on ( )
	{
		#inicia uma instância se necessário
		if ( null === self::$instance ) { 
			self::$instance = new self ( );
			array_push ( self::$message, "New Instance Connect" );
		};

		$inst = self::$instance;

		if ( null !== $inst && $inst->onServer ( $inst->host [ "host" ], $inst->host [ "port" ] ) ) {;
			$inst->open ( );
		};
		
        return self::$instance->mysqli;
	}

	# fecha connexão mysqli 
	private function close ( ) 
	{
		if ( null !== self::$instance->mysqli && self::$instance->mysqli->close ( ) ) {
			array_push ( self::$message, "Close connect Mysqli." );
		} else {
			array_push ( self::$message, "Error close connect Mysqli." );
		};
	}

	# encerra a instancia da classe ConnectMysqli
	public static function off ( ) 
	{
		self::$instance->close ( );
		array_push ( self::$message, "Off instance Connect" );
		return self::$instance = null;
	}

	# reprota mensagens de status, mensagems, erros,excessões e logs
	public static function report ( ): string 
	{
		# return = { status: true, errors: 01, message: [ ], exceptions: [ ], }
		return json_encode ( array ( "message" => self::$message, "exception" => self::$exception ) );
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { 
		self::$message = array ( );
		self::$exception = array ( );
	}

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

#echo Connect::report ( );
#echo Connect::off ( );