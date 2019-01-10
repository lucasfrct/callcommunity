<?php 
include_once ( "login.crud.php" );

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
        return $this->data = json_decode ( $_POST [ "loginservice" ], TRUE );
    }

    public function email ( )
    {   
        if ( 
            $this->request ( ) 
            && count ( $this->getData ( ) ) == 1 
            && empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] )
        ) {
            $data = $this->crud->email ( $this->data [ "email" ] );
            echo json_encode ( ( count ( $data ) == 2 ) ? $data : array ( FALSE ) );
        };
    }

    public function password ( )
    {
        if ( 
            $this->request ( ) 
            && count ( $this->getData ( ) ) == 1 
            && !empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] ) 
        ) {
            $status = $this->crud->password ( $this->data [ "email" ], $_SERVER [ "HTTP_AUTHENTICATION" ] );
            echo json_encode ( ( $status ) ? array ( "session"=>"001", "tokenAccess"=>$this->token ) :  array ( FALSE ) );
        };  
    } 
};

$service = new Service;
$service->email ( );
$service->password ( );