<?php
#Modeldata.php
include_once ( "autoload.php" );

use Crud as Crud;
use ICrud as interfaceCrud;

class Modeldata 
{
    private $debug = Array ( );
    private $crud = null;
    
    public $action = "";
    public $table = "";
    public $data = "";
    public $fields = "";
    public $query = "";

    # addiciona novas notificaçãoes no debug
    private function addDebug ( $debug  = null ): void
    {
        if ( null != $debug ) {
            array_push ( $this->debug, $debug );
        };
    }

    # reporta uma string do debug
    public function debug ( ): string 
    {
        return json_encode ( $this->debug );
    }

    # faz parse pra dados booleanos
    private function parseBool ( $bool = "" ) 
    {   
        if ( !is_array ( $bool ) ) {
            switch ( strtolower ( $bool ) ) {
                case "true":
                    $this->addDebug ( "Parseboool : true" );
                    return true;
                    break;
                case "false":
                    $this->addDebug ( "Parseboool : false" );
                    return false;
                    break;
                default:
                    return $bool;
                    break;
            };
        };
        return $bool;
    }

    # transforma um array para estrutura de campo e valores separados
    private function parseJsonToFieldsAndValues ( array $data = null ): array 
    {
        $parse = array ( "fields" => array ( ) , "values" => array ( ) );

        foreach ( $data as $field => $value ) {
            if ( isset ( $parse [ "fields" ] ) ) {
                array_push ( $parse [ "fields" ], ( string ) $field );
            };
            if ( isset ( $parse [ "values" ] ) ) {
                $value = $this->arraySerialize ( $this->parseBool ( $value ) );
                array_push ( $parse [ "values" ], "'".$value."'" );
            };
        };

       $parse [ "fields" ] = implode ( ",", $parse [ "fields" ] );
       $parse [ "values" ] = implode ( ",", $parse [ "values" ] );
       return $parse;
    }

    # transforma uma arrya para estrutura de campo = 'valor'
    private function parseJsonToFields ( array $data = null ): string
    {   
        $values = array ( );

        foreach ( $data as $field => $value ) {
            $value = $this->arraySerialize ( $this->parseBool ( $value ) );
            array_push ( $values, "{$field} = '{$value}'" );
        };

        return implode ( ",", $values );
    } 

    # detecta se o dados éw uma array e serializa para uma string
    private function arraySerialize ( $data = "" )
    {
        if ( is_array ( $data ) && count ( $data ) > 0 ) {
            $data = serialize ( $data );
        };

        return $data;
    }

    # detect se é uma string serializada e converte para uma array
    private function arrayUnserialize ( $data = "" ) 
    {
        if ( is_array ( $data ) ) {
            function filterData ( $item ) {
                if ( is_array ( $item ) ) {
                    $item = array_map ( 'filterData', $item ); 
                };
                return ( $item == serialize ( false ) || false !== @unserialize ( $item ) ) ?  unserialize ( $item ) : $item;
            };
            $data = array_map ( 'filterData', $data );
        };

        return $data;
    } 

    # inicia um instância da classe Modeldata e injeta a injeção Connect com um objeto MySqli 
    public function __construct ( interfaceCrud $crud = null  ) 
    { 
        $this->addDebug ( "New instance Modeldata" );
        
        if ( null !== $crud ) {
            $this->crud = $crud;
            $this->addDebug ( "New instance Crud" );
        };
    }

    # passar um string JSON para array e carrega as variáveis para determinar a ação da crud
    public function digest ( $json ) 
    {   
        $this->addDebug ( "Action: digest" );
        $data = ( is_array ( $json ) ) ? $json : json_decode ( $json, true );

        if ( isset ( $data [ "action" ] ) ) {
            $this->action = $data [ "action" ];
            $this->addDebug ( "Load: var action" );
        };

        if ( isset ( $data [ "table" ] ) ) {
            $this->table = $data [ "table" ];
            $this->addDebug ( "Load var table" );
        };


        if ( isset ( $data [ "data" ] ) ) {  
            $this->data = $data [ "data" ];
            $this->addDebug ( "Load var data" );
        };

         if ( isset ( $data [ "fields" ] ) ) {  
            $this->fields = $data [ "fields" ];
            $this->addDebug ( "Load var fields" );
        };

        if ( isset ( $data [ "query" ] ) ) { 
            $this->query = $data [ "query" ];
            $this->addDebug ( "Load var query" );
        };

        return $this->run ( );
    }

    # envia dados no formato Create para o crud
    private function create ( ): bool 
    {   
        $this->addDebug ( "Action: method Create" );
        $data = $this->parseJsonToFieldsAndValues ( $this->data );
        return $this->crud->create ( $this->table, $data [ "fields" ], $data [ "values" ] );
    }

    # envia dados no formato Read para o crud
    private function read ( ): string 
    {
        $this->addDebug ( "Action: method Read" );
        return json_encode ( $this->arrayUnserialize ( $this->crud->read ( $this->table, $this->fields, $this->query ) ) );
    }

    # envia dados no formato Update para o crud
    private function update ( ): bool
    {
        $this->addDebug ( "Action: method Update" );
        return $this->crud->update ( $this->table, $this->parseJsonToFields ( $this->data ), $this->query );
    }

    # envia dados no formato Delete para o crud
    private function delete ( ): bool 
    {
        $this->addDebug ( "Action: method Delete" );
        return $this->crud->delete ( $this->table, $this->query );
    }

    # Executa ação carregada pelo digest
    private function run ( ) 
    {
        $this->addDebug ( "Action: method run" );
        switch ( strtolower ( $this->action ) ) {
            case "create":
                return $this->create ( );
                break;
            case "read":
                return $this->read ( );
                break;
            case "update":
                return $this->update ( );
                break;
            case "delete": 
                return $this->delete ( );
                break;
            default:
                return "No action!";
                break;
        };
    }

    private function __clone ( ) { }
    
    private function __wakeup ( ) { }
}

# teste dos métodos públicos
#$model = new Modeldata ( Crud::on ( Connect::on ( "127.0.0.1:3306", "root", "", "test" ) ) );

#echo $model->action;
#echo $model->table;
#echo $model->data;
#echo $model->fields;
#$model->digest ( '{ "action": "create", "table": "test", "data": { "user": "modeldata", "password": "model1234", 
#    "parent": [ { "name": "p" }, { "name": "pp" }, { "name": "ppp" } ] 
#} }' );
#$read = $model->digest ( '{ "action": "read", "table": "test", "fields": "id, user, parent", "query": "id >= 0" }' );
#echo json_encode ( $read ); // var_dump ( $model->read ( ) );
#$model->digest ( '{ "action": "update", "table": "test", "data":{ "password": "modelUpdate" }, "query": "id >= 0" }' );
#$model->digest ( '{ "action": "delete", "table": "test", "query": "id > 0" }' );
#echo $model->debug ( );
