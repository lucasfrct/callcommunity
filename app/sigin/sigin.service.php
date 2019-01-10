<?php 
include_once ( "sigin.crud.php" );

class Service
{
    private $data = null;
    private $email = "admin@admin.com";
    private $pass = "admin";
    private $crud = null;
    private $token = "1010";

    public function __construct ( )
    { 
        $this->crud = new Crud;
    }
    
    public function request ( )
    {
        return ( 
            $_SERVER [ 'REQUEST_METHOD' ] == "POST" 
            && !empty ( $_SERVER [ "HTTP_ACCESS_TOKEN" ] )
            && $_SERVER [ "HTTP_ACCESS_TOKEN" ] == $this->token
        ) ? TRUE : FALSE;
    }
    
    public function getData ( ) 
    {
        return $this->data = json_decode ( $_POST [ "siginservice" ], TRUE );
    }

    public function createUser ( ) 
    {
        if ( $this->request( ) && count ( $this->getData ( ) ) > 0 && !empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] ) ) {
            echo json_encode ( array ( $this->crud->createUser ( $this->data, $_SERVER [ "HTTP_AUTHENTICATION" ] ) ) );
        };
    }
};

$service = new Service;
$service->createUser ( );