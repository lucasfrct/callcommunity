<?php

class Crud
{
	private $mysqli = NULL;
    public $debug = Array ( );
    
    public function __construct ( )
    {
        $this->connect ( ); 
    }

    public function connect ( ) 
    {
    	$mysqli = @new mysqli ( "127.0.0.1:3306", "root", "", "callcommunity" );
    	if ( !$mysqli->connect_errno ) {
    		$this->mysqli = $mysqli;
            $this->mysqli->set_charset( "utf8" );
    	} else {
    		$this->mysqli = NULL;
    	}
    	return $this->mysqli;
    }

    public function email ( string $email = "" ) {
        $sql = "SELECT `user`, `email` FROM callcommunity.registers WHERE `email` = '".$email."' LIMIT 1";
    	$result = $this->mysqli->query ( $sql ); 
        if ( $this->mysqli->affected_rows > 0 ) {
            $row = $result->fetch_array( );
            return array (  "email"=> $row [ "email"], "user"=> $row [ "user" ] );
        } else {
            return  array ( "false" );
        };
    }

    public function password ( string $email = "", string $password = "" ) {
        $sql = "SELECT  `email`, `password` FROM callcommunity.registers WHERE `email` = '".$email."' AND `password` = '".$password."' LIMIT 1";
        $result = $this->mysqli->query ( $sql ); 
        if ( $this->mysqli->affected_rows > 0 ) {
            $row = $result->fetch_array( );
            return ( $row [ "email"] == $email ) ? TRUE : FALSE;
        } else {
            return FALSE;
        };
    }
};