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
            array_push ( $this->debug, "Success Connect" );
    	} else {
    		$this->mysqli = NULL;
            array_push ( $this->debug, "Error Connect" );
    	}
    	return $this->mysqli;
    }

    public function createUser (  $data = null, string $password = "" ) 
    {

        $sql = "SELECT `email` FROM callcommunity.registers WHERE `email` = '".$data [ "email" ]."' LIMIT 1"; 
        $result = $this->mysqli->query ( $sql );

        if ( $result->num_rows == 0 ) {

            $sql = "INSERT INTO callcommunity.registers ( `user`, `email`, `password` ) VALUES ( '".$data [ "user" ]."', '".$data [ "email" ]."', '".$password."' ) "; 
            $this->mysqli->query ( $sql );

            if ( $this->mysqli->affected_rows ) {
                $sql = "UPDATE callcommunity.users SET `firstName`='".$data [ "firstName" ]."' WHERE `id` = ".$this->mysqli->insert_id;
                $this->mysqli->query ( $sql );
            };
            
            return $this->mysqli->affected_rows;

        } else {
            return - 1;
        };
    }
};