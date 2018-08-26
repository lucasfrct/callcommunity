<?php
#Connect.php

class Connect 
{

	# Instância única 
	private static $instance = null;
	public static $debug = Array ( );
	private $mysqli = null;
	private $host = "127.0.0.1:3306";
	private $user = "root";
	private $password = "";
	private $database = "mysql";

	# addiciona novas notificaçãoes no debug
	private static function addDebug ( $debug  = null ) : void
	{
		if ( null != $debug ) {
			array_push ( self::$debug, $debug );
		};
	}

	# reporta uma string do debug
	public static function debug ( ): string 
	{
		return json_encode ( self::$debug );
	}

	# Testa se o servidor esta online
	private function ping ( string $host = "" ) : bool 
	{		
		$server = @fsockopen ( $host, -1, $errCode, $errStr, 1 );
		@fclose ( $server );
		$ping = ( $server ) ? TRUE : FALSE;
		self::addDebug ( "Ping : (".( ( $ping ) ? "ON" : "OFF" ).") ".$host );
		return $ping;
	}

	# Abre connecxão Mysqli
	private function openMysqli ( ) : MySqli
	{
		try {
			$inst = self::$instance;

			$inst->mysqli = @new \Mysqli ( $inst->host, $inst->user, $inst->password, $inst->database );
			
			if ( !$inst->mysqli->connect_errno && !$inst->mysqli->connect_error ) {
				$inst->mysqli->set_charset( "utf8" );
				self::addDebug ( "Open Connect Mysqli." );
			} else {
				self::addDebug ( "Error Connect Mysqli: ".$inst->mysqli->connect_errno );
				self::addDebug ( "Error Connect Mysqli: ".$inst->mysqli->connect_error );
				$inst->mysqli = null;
				self::addDebug ( "kill Connect Myqli" );
			};

		} catch ( Exception $exception ) {
			self::addDebug ( $exception );
		};

		return self::$instance->mysqli;
	}

	# fecha connexão mysqli 
	private function closeMysqli ( ) : bool
	{	
		$close = false;
		if ( null !== self::$instance->mysqli && self::$instance->mysqli->close ( ) ) {
			self::addDebug ( "Close connect Mysqli." );
			$close = true; 
		};
		return $close;
	}

	# inicia uma instância da classe Connect e inicia e retorna uma instância Msqli
	public static function on ( string $host = "", string $user = "", string $password = "", string $database = "" )
	{
		#inicia uma instância se necessário
		if ( null === self::$instance ) { 
			self::$instance = new self ( );
			self::addDebug ( "New Istance Connect" );
		};

		$inst = self::$instance;

		$inst->host = ( empty ( $host ) ) ? $inst->host : $host;

		if ( null !== $inst && $inst->ping ( $inst->host ) ) {
			
			$inst->user = ( empty ( $user ) ) ? $inst->user :$user; 
			$inst->password = ( empty ( $password ) ) ? $inst->password : $password;
			$inst->database = ( empty ( $database ) ) ? $inst->database :$database;

			$inst->openMysqli ( );
		};
		
        return self::$instance->mysqli;
	}

	# encerra a instância msqli e a instância da classe ConnectMysqli
	public static function off ( )
	{
		self::$instance->closeMysqli ( );
		self::addDebug ( "Off: kill instance Connect" );
		return self::$instance = null;
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { 
		self::$debug = array ( );
	}

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

#teste de métodos públicos
#Connect::on ( "127.0.0.1:3306", "root", "", "mysql" );
#echo Connect::off ( );
#echo Connect::debug ( );