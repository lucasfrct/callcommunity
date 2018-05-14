<?php
#Crud.php

use Connect as CrudConnect;
use Modeldata as CrudMedeldata;

class Crud
{
    private static $instance = null;
    private $connect = null;
    private $model = null;
    private $data = null;
    private $response = "";
    public static $message = Array ( ); #array_push (self::$message, "" );

    public static function on ( ): Crud 
    {
        if ( null === self::$instance ) { 
            self::$instance = new self ( );
            self::$instance->connect = CrudConnect::on ( );
            self::$instance->model = CrudMedeldata::on ( );
            self::$message = array_merge ( self::$message, CrudConnect::$message );
            self::$message = array_merge ( self::$message, CrudConnect::$exception );
            array_push ( self::$message, "New instance Crud" );
        };  

        return self::$instance;
    }

    public function create ( string $table = null, string $fields = null, string $values = null ): bool 
    {
        if ( !empty ( $table ) && !empty ( $fields ) && !empty ( $values ) ) {
            return ( 
                self::$instance->connect->query (  
                    "INSERT INTO {$table} ( {$fields} ) VALUES ( {$values} )" 
                ) 
                && self::$instance->connect->affected_rows > 0 && array_push ( self::$message, "Use Crud create" )
            ) ? true : false;
        };
    } 

    public function read ( string $table = null, string $fields = "*", string $condition = "" ): array 
    {
        if ( !empty ( $table ) ) {
            $rows = array ( );
            $condition = ( empty ( $condition ) ) ? "WHERE" : $condition;
            
            $result = self::$instance->connect->query ( 
                "SELECT {$fields} FROM {$table} {$condition} AND enable = true", 
                MYSQLI_USE_RESULT 
            );

            while ( $row = $result->fetch_assoc ( ) ) {  
                array_push ( $rows, self::$instance->model->parseDatabaseToArray ( $row ) ); 
            };
            
            array_push (self::$message, "Use crud read" );
            return $rows;
        };
    }

    public function update ( string $table = null, string $set = "", string $condition = "" ): bool 
    {
        if ( !empty ( $table ) && !empty ( $set ) && !empty ( $condition ) ) {
            return  ( 
                self::$instance->connect->query ( "UPDATE {$table} SET {$set} {$condition}" )
                && self::$instance->connect->affected_rows > 0 && array_push ( self::$message, "Use Crud update" )
            ) ? true : false;
        };
    }

    public function delete ( string $table = null, string $condition = null ): bool 
    {
        return self::$instance->update ( $table, "enable = false", $condition );
    }

    public function digestJson ( string $data = NULL ): array {
        array_push ( self::$message, "Use model digest" );
        return self::$instance->data = self::$instance->model->digest ( $data );
    }

    public function run ( )
    {

        $ins = self::$instance;

        $action = $ins->data [ "action" ];
        
        $table = $ins->data [ "table" ];
        
        $fields = ( isset ( $ins->data [ "fields" ] ) ) ? $ins->data [ "fields" ] : NULL;
        
        $id = ( isset ( $ins->data [ "id" ] ) ) ? $ins->data [ "id" ] : NULL;
        
        $condition = ( isset ( $ins->data [ "condition" ] ) ) ? $ins->model->parseJsonToItem ( $ins->data [ "condition" ] ) : NULL;
        $condition = ( NULL !== $condition ) ? implode ( " AND ", explode ( ",", $condition ) ) : $condition;
        
        $data = ( isset ( $ins->data [ "data" ] ) ) ? $ins->data [ "data" ] : NULL;
        
        #print_r ( $ins->data );

        switch ( $action ) {
            case "create":
                $parse = $ins->model->parseJsonToFieldsAndValues ( $data );
                $ins->response = $ins->create ( $table, $parse [ "fields" ], $parse [ "values" ] );
                break;
            case "read":
                $cond = ( $id == "*" || $id == "" ) ? " id > 0" :  "id = {$id}";
                $cond = ( NULL !== $condition ) ? "{$cond} AND {$condition}" : $cond;
                $ins->response = $ins->read ( $table, $fields, "WHERE {$cond}" );
                break;
            case "update":
                $data = $ins->model->parseJsonToItem ( $data );
                $cond = ( NULL !== $condition ) ? "id = {$id} AND {$condition}" : "id = {$id}";
                if ( !empty ( $id ) || $id !== NULL ) {
                    $ins->response = $ins->update ( $table, $data, "WHERE {$cond}" );
                } else {
                    $ins->response = false;
                };
                break;
            case "delete": 
                $cond = ( NULL !== $condition ) ? "id = {$id} AND {$condition}" : "id = {$id}";
                if ( !empty ( $id ) || $id !== NULL ) {
                    $ins->response = $ins->delete ( $table, "WHERE {$cond}" );
                } else {
                    $ins->response = false;
                };
                break;
            default:
                break;
        };

        array_push ( self::$message, "Use Crud run" );

        return $ins->response;
    }

    public function response ( ): string 
    { 
        array_push ( self::$message, "return Crud response" );
        return json_encode ( self::$instance->response );
    }

    public static function report ( ) {
        return json_encode ( self::$message );
    }

    public static function off ( ): bool 
    {
        if ( self::$instance ) {
            self::$instance = null;
            CrudConnect::off ( );
            self::$message = Array ( );
        };  

        return ( null === self::$instance ) ? true : false;
    }

    private function __construct ( ) { }
    
    private function __clone ( ) { }
    
    private function __wakeup ( ) { } 
};

#$create = '{ "action": "create", "table":"crud.address", "data": { "idUser": "1", "street":"street1", "city": "city1", "country":"country1" } }';
#$read = '{ "action": "read", "table":"crud.address", "fields": "*", "id": "" }';
#$update = '{ "action": "update", "table":"crud.address", "data":{ "street":"s2", "city":"c2" }, "id":"1" }';
#$delete = '{ "action": "delete", "table": "crud.address", "id":"3" }';
#$crud = Crud::on ( Connect::on ( ), Modeldata::on ( ) );
#$crud->digestJson ( $create );
#echo $crud->run ( );
#echo $crud->response ( );
#echo $crud->create ( $table, $fields, $values );
#echo $crud->read ( $table, $fields, $condition );
#echo $crud->update ( $table, $set, $condition ); // $set = 'field="value",field="value"'
#echo $crud->delete ( $table, $condition );