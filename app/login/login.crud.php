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
            
            if ( $row [ "email"] == $email ) {
                return array ( "session"=>"001", "tokenAccess"=>"1010" );
            } else {
                return  array ( "false" );
            };

        } else {
            return  array ( "false" );
        };
    }
};

#$c = new Crud;
#echo json_encode ( $c->email ( "admin@domain.com" ) );
#echo json_encode ( $c->password ( "admin@domain.com", "admin" ) );