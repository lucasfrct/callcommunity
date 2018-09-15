<?php 
include_once ( "../Authenticate.php" );
include_once ( "../../lib/crud/autoload.php" );

class Service
{
    private $response = FALSE;
    private $crud = null;
    private $model = null;
    private $data = [ ];
    private $author = null;
    
    public function __construct ( )
    {
        $this->author = new Authenticate;
        $this->crud = Crud::on ( Connect::on ( "127.0.0.1:3306", "root", "", "callcommunity" ) );
        $this->model = new Modeldata ( $this->crud );
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
        return $this->data = json_decode ( $_POST [ "callcommunity" ], TRUE );
    }

    public function logInEmail ( )
    {   
        if ( $this->request ( ) ) {
            
            $this->getData ( );

            if ( $this->data [ "action" ] == "read-login" ) {

                $this->data [ "action" ] = "read";
                $this->data [ "fields" ] = "email";
                $this->data [ "query" ] = "email = '".$this->data [ "data" ][ "email" ]."' LIMIT 1";

                $check  = $this->model->digest ( $this->data );

                if ( count ( json_decode ( $check , true ) ) >= 1 ) {
                    $this->response = TRUE;
                };
            };
        };
    }

    public function logInPassword ( )
    {
        if ( $this->request ( ) ) {
            
            $this->getData ( );

            if ( $this->data [ "action" ] == "login" && $this->author->checkToken ( ) ) {

                $password = $this->author->getHttpAuthenticate ( );
                $this->data [ "action" ] = "read";
                $this->data [ "fields" ] = "email, password";
                $this->data [ "query" ] = "email = '".$this->data [ "data" ][ "email" ]."' AND password = '".$password."' LIMIT 1";

                $check = $this->model->digest ( $this->data );
                
                if ( count ( json_decode ( $check, TRUE ) ) >= 1) {
                    $this->response = TRUE;
                };  
            };
        };   
    } 

    public function response ( )
    {
        echo json_encode ( $this->response );
    }
};

$serv = new Service;
$serv->logInEmail ( );
$serv->logInPassword ( );
$serv->response ( );