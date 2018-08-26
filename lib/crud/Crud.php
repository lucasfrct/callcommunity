<?php
#Crud.php

include_once ( "autoload.php" );

use Connect as CrudConnect;
use ICrud as interfaceCrud;

class Crud implements interfaceCrud
{
    private static $instance = null;
    private static $debug = Array ( );
    private $connect = null;

    # addiciona novas notificaçãoes no debug
    private static function addDebug ( $debug  = null ): void
    {
        if ( null != $debug ) {
            array_push ( self::$debug, $debug );
        };
    }

    # reporta uma string do debug
    public static function debug ( ): string 
    {
        return json_encode ( self::$debug );
    }

    # inicia um instância da classe Crud e injeta a injeção Connect com um objeto MySqli 
    public static function on ( MySqli $connect = null ): Crud 
    {
        if ( null === self::$instance ) { 

            self::$instance = new self ( );

            self::$instance->connect = $connect;
            
            self::addDebug ( "New instance Crud" );
            self::addDebug ( "New Injection Connect MySqli" );
        };  

        return self::$instance;
    }

    # Inicia uma consulta diratamneto no objeto MySqli 
    public function query ( string $sql, $options = MYSQLI_USE_RESULT ) 
    {
        self::addDebug ( "Action MySqli Query" );
        return self::$instance->connect->query ( $sql ); 
    }

    # insere valores no banco de dados. O campo valores deve conter a seguinte estrutura: 'value','value','value'
    public function create ( string $table = "", string $fields = "", string $values = "" ): bool 
    {
        if ( !empty ( $table ) && !empty ( $fields ) && !empty ( $values ) ) {
            self::addDebug ( "Action Create");
            $sql = "INSERT INTO {$table} ( {$fields} ) VALUES ( {$values} )";
            return ( self::$instance->query ( $sql )  && self::$instance->connect->affected_rows > 0 ) ? true : false;
        };
    } 

    public function read ( string $table = "", string $fields = "*", string $query = "" ): array 
    {
        $rows = array ( );
        
        if ( !empty ( $table )  && !empty ( $query ) ) {
            
            $sql = "SELECT {$fields} FROM {$table} WHERE {$query}";

            $result = self::$instance->query ( $sql , MYSQLI_USE_RESULT );

            while ( $row = $result->fetch_assoc ( ) ) {  
                array_push ( $rows, $row ); 
            };
        };

        ( count ( $rows ) > 0 ) ? self::addDebug ( "Action MySqli Read" ) : self::addDebug ( "Action MySqli Read Response Void" );

        return $rows;
    }

    public function update ( string $table = "", string $fields = "", string $query = "" ): bool 
    {
        $update = false;

        if ( !empty ( $table ) && !empty ( $query ) ) {
            self::addDebug ( "Action MySqli Update" );
            $update = ( self::$instance->query ( "UPDATE {$table} SET {$fields} WHERE {$query}" ) && self::$instance->connect->affected_rows > 0 ) ? true : false;
        };

        return $update;
    }

    public function delete ( string $table = "", string $query = "" ): bool 
    {
        $delete = false;
        
        if ( !empty ( $table ) && !empty ( $query ) ) {
            self::addDebug ( "Action MySqli Delete" );
            $delete = ( self::$instance->query ( "DELETE FROM {$table} WHERE {$query}" ) && self::$instance->connect->affected_rows > 0 ) ? true : false;
        };
        
        return $delete;
    }

    public static function off ( )
    {
        self::$instance->connect = null;
        self::addDebug ( "Kill injection Connect" );
        self::addDebug ( "Off: Kill instance Crud" );
        return self::$instance = null;
    }

    private function __construct ( ) { 
        self::$debug = Array ( );
    }
    
    private function __clone ( ) { }
    
    private function __wakeup ( ) { } 
};

# Teste de métodos públicos
#$conn = CrudConnect::on ( "127.0.0.1:3306", "root", "", "test" );
#echo Connect::debug ( );

#$crud = Crud::on ( $conn );
#$crud->create ( "test", "user, password", "'admin','admin'" );
#echo json_encode ( $crud->read ( "test", "user", 'user = "admin"' ) );
#$crud->update ( "test", "password = 'adminPass'", "id >= 1" );
#$crud->delete ( "test", "id >= 7" );
#echo $crud->debug ( );
#$crud->off ( );