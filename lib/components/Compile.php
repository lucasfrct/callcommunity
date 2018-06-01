<?php
#Compile.php
/*
Compile::list ( array );
Complie::join ( );
Compile::write ( string file );
Complie::report ( );
*/

class Compile 
{
	private static $status = true;
	private static $list = null;
	private static $compile = "";
	private static $source = "";
	private static $write = "false";
	private static $msg = "";

	public static function list ( array $array = [ ] ): array 
	{	
		self::$status = true;
		self::$list = Array ( );
		self::$compile = "";
		self::$source = "";
		self::$write = "false";
		self::$msg = "";
		return self::$list = $array;
	}

	private static function read ( string $file = "" ): string 
	{

		$read = "";

		if ( file_exists ( $file ) && self::$status === true ) {
			$read = file_get_contents ( $file );
		} else {
			self::$status = false;
			self::$msg = self::$msg."<br>| file inexists! (".$file.")";
		};

		return $read;
	}

	public static function join ( ): string 
	{
		foreach ( self::$list as $key => $value ) {
			self::$compile = self::$compile.self::read ( $value )."\n\n";
		};

		return self::$compile;
	}

	public static function data ( ): string 
	{
		return self::$compile;
	}

	public static function write ( string $source = "" ): bool
	{
		$write = false;
		self::$source = $source;

		if ( !empty ( self::$compile ) && self::$status === true ) {
			$file = fopen ( $source, 'w' );
			fwrite ( $file, self::$compile ); 
			$write = fclose ( $file );
		} else {
			self::$msg = self::$msg."<br> | No possible write! (".$source.")";
		};

		( $write == true ) ? self::$write = "true" : self::$write = "false";
		return $write;
	}

	public static function report ( ) {
		echo "<b>Status:</b> "; 
		echo ( self::$status === true ) ? "true" : "false";
		echo "<br>";
		echo "<b>List:</b> ".json_encode ( self::$list );
		echo "<br> <b>Join:</b>";
		echo "<br> <b>Write:</b> ".self::$write." |  ".self::$source;
		echo '<br><h4 style="color:#F00">'.self::$msg.'</h4>';
	}
}