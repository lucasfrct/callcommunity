<?php 
include_once ( "login.crud.php" );

class Service
{
    private $token = "1010";
    private $data = null;
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

    public function resetpassword ( ) 
    {
        $reset = array ( FALSE );
        if ( 
            $this->request ( ) 
            && count ( $this->getData ( ) ) == 2 
            && $this->data [ "type" ] == "reset" 
        ) {
            $data = $this->crud->email ( $this->data [ "email" ] );
            if ( count ( $data ) == 2 ) {
                $this->gerateLinkreset ( );
                $reset = array ( TRUE );
            };
            
            echo json_encode ( $reset );
        };

    }

    public function gerateLinkreset ( ) 
    {
    }
};

$service = new Service;
$service->resetpassword ( );
$service->email ( );
$service->password ( );