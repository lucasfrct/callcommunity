<?php 
#Authenticate.php

class Authenticate 
{
	private $token = "1010";
	private $httpToken = "";
	private $authenticate = "";
	private $httpAuth = "";

	public function __construct ( ) 
	{
		$httpToken = 'HTTP_ACCESS_TOKEN';
		$httpAuth = 'HTTP_AUTHENTICATE';
		$this->httpToken = ( isset ( $_SERVER [ $httpToken ] ) ) ? $_SERVER [ $httpToken ] : "";
		$this->httpAuth = ( isset ( $_SERVER [ $httpAuth ]) ) ? $_SERVER [ $httpAuth ] : "";
	}

	public function getToken ( ) : string 
	{
		return sha1 ( $this->token );
	}

	public function getHttpToken ( ) : string 
	{
		return $this->httpToken;
	}

	public function set ( string $authenticate = "" ) : string
	{
		return $this->authenticate = $authenticate;
	}

	public function get ( ) : string
	{
		return $this->authenticate;
	}

	public function getHttpAuthenticate ( ) : string 
	{
		return $this->httpAuth;
	}

	public function checkToken ( ) : bool
	{
		return ( $this->getHttpToken ( ) === $this->getToken ( ) ) ? TRUE : FALSE;
	}

	private function checkAutenticate ( ) : bool
	{
		return ( $this->get ( ) === $this->getHttpAuthenticate ( ) ) ? TRUE : FALSE;
	}

	public function access ( ) : bool
	{
		return ( $this->checkToken ( ) && $this->checkAutenticate ( ) ) ? TRUE : FALSE;
	}
};