<?php 
#Authenticate.php

class Authenticate 
{
	private $status = false;
	private $token = "0000";
	private $accessToken = "";
	private $user = "null";
	private $accessUser = "null";
	private $password = "null";
	private $accessPassword = "null";
	public $msg = "Acesso negado.";

	public function setToken ( string $token = "null" ) : string
	{
		return $this->token = $token;
	}

	public function setUser ( string $user = "" ) : string 
	{
		return $this->user = $user;
	}

	public function setPassword ( string $password = "" ) : string
	{
		return $this->password = $password;
	}

	public function getAccessToken ( string $AccessToken = "HTTP_ACCESS_TOKEN" ) : string 
	{
		return $this->accessToken = ( isset ( $_SERVER [ $AccessToken ] ) ) ? $_SERVER [ $AccessToken ] : "";
	}

	public function getAccessUser ( string $accessUser = "HTTP_ACCESS_USER" ) : string
	{
		return $this->accessUser = ( isset ( $_SERVER [ $accessUser ] ) ) ? $_SERVER [ $accessUser ] : "";
	}

	public function getAccessPassword ( string $accessPassword = "HTTP_ACCESS_PASSWORD" ) : string
	{
		return $this->accessPassword = ( isset ( $_SERVER [ $accessPassword ]) ) ? $_SERVER [ $accessPassword ] : "";
	}

	public function checkToken ( ) 
	{
		return ( $this->getAccessToken ( ) === $this->token ) ? TRUE : FALSE;
	}

	public function checkUser ( ) 
	{
		return ( $this->checkToken ( ) && $this->getAccessUser ( ) === $this->user ) ? TRUE : FALSE;
	}

	public function access ( ) {
		
		if ( !$this->status && $this->checkUser ( ) && $this->getAccessPassword ( ) === $this->password ) {

			$this->status = true;
			$this->msg = "Acesso Permitido";

		} else {
			
			$this->msg = "Acesso Negado";
			$this->status = false;
		
		};

		return $this->status;
	}
};

/*
$_SERVER [ "HTTP_ACCESS_TOKEN" ] = "1010";
$_SERVER [ "HTTP_ACCESS_USER" ] = "lucas";
$_SERVER [ "HTTP_ACCESS_PASSWORD" ] = "costa";

$author = new Authenticate;
$author->setToken ( "1010" );
$author->setUser ( "lucas" );
$author->setPassword ( "costa" );
$author->checkToken ( );
$author->checkUser ( );
$author->access ( );
echo $author->msg;
*/