<?php 

class Service
{
    private $data = null;
    private $email = "admin@admin.com";
    private $pass = "admin";

    public function __construct ( )
    {
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

            if ( $this->data [ "email" ] == $this->email ){
                echo json_encode ( array ( "user"=>"Admin System", "email"=>$this->email ) );
            };

        };
    }

    public function password ( )
    {
        if ( $this->request ( ) && count ( $this->getData ( ) ) == 2 ) {

            if ( $this->data [ "email" ] == $this->email && $this->data [ "password" ] == $this->pass ){
                echo json_encode ( array ( "session"=>"001", "tokenAccess"=>"1010" ) );
            };
            
        };  
    } 
};

$service = new Service;
$service->email ( );
$service->password ( );