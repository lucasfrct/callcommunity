<?php 
include_once ( "login.crud.php" );

class Service
{
    private $data = null;
    private $email = "admin@admin.com";
    private $pass = "admin";
    private $crud = null;

    public function __construct ( )
    { 
        $this->crud = new Crud;
    }
    
    public function request ( )
    {
        return ( 
            $_SERVER [ 'REQUEST_METHOD' ] == "POST" 
            && !empty ( $_SERVER [ "HTTP_ACCESS_TOKEN" ] )
        ) ? TRUE : FALSE;
    }
    
    public function getData ( ) 
    {
        return $this->data = json_decode ( $_POST [ "loginservice" ], TRUE );
    }

    public function email ( )
    {   
        if ( $this->request ( ) && count ( $this->getData ( ) ) == 1 ) {

            $data = $this->crud->email ( $this->data [ "email" ] );

            if ( count ( $data ) == 2 ){
                echo json_encode ( $data );
            };

        };
    }

    public function password ( )
    {
        if ( $this->request ( ) && count ( $this->getData ( ) ) == 2 ) {

            $data = $this->crud->password ( $this->data [ "email" ], $this->data [ "password" ] );

            if ( count ( $data ) == 2 ) {
                echo json_encode ( $data );
            };
            
        };  
    } 
};

$service = new Service;
$service->email ( );
$service->password ( );