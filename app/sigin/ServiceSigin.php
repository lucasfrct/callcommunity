<?php 
include_once ( "../Authenticate.php" );
include_once ( "../../lib/crud/autoload.php" );

class Service
{
    private $response = false;
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

    public function sigIn ( )
    {   
        if ( $this->request ( ) ) {
            
            $this->getData ( );

            if ( $this->data [ "action" ] == "sigin" ) {
                
                $this->data [ "action" ]  = "read";
                $this->data [ "fields" ] = "email";
                $this->data [ "query" ] = "email = '".$this->data [ "data" ][ "email" ]."' LIMIT 1";

                $check  = $this->model->digest ( $this->data );
                
                if ( !count ( json_decode ( $check , true ) ) >= 1 ) {
                    $password = $this->author->getHttpAuthenticate ( );
                    if( $this->author->checkToken ( ) && !empty ( $password ) ) {
                        $this->data [ "action" ] = "create";
                        $this->data [ "data" ][ "password"] = $password;
                        $this->response = $this->model->digest ( $this->data  );         
                    };
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
$serv->sigIn ( );
$serv->response ( );