<?php 
#Authenticate.php

class Authenticate 
{
	private $status = false;
	private $token = "0000";
	private $accessToken = "";
	private $user = "";
	private $accessUser = "";
	private $password = "";
	private $accessPassword = "";
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

	public function Access ( ) {
		
		if ( !$this->status && $this->getAccessToken ( ) === $this->token ) {

			if ( !$this->status && $this->getAccessUser ( ) === $this->user && $this->getAccessPassword ( ) === $this->password ) {
				$this->status = true;
				$this->msg = "Acesso Permitido";
			} else {
				$this->msg = "Acesso Negado";
				$this->status = false;
			};

		} else {
			$this->status = false;
		};

		return json_encode ( $this->status );
	}
};

$author = new Authenticate;

echo $author->Access ( );
echo "<br>";
echo $author->msg;