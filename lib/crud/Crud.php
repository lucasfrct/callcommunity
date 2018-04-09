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
    private $response = null;
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

    public function create ( string $table = null, string $fields = null, string $values = null ): bool {
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
            $condition = ( empty ( $condition ) ) ? "WHERE" : $condition." AND ";
            
            $result = self::$instance->connect->query ( 
                "SELECT {$fields} FROM {$table} {$condition} enable = true", 
                MYSQLI_USE_RESULT 
            );

            while ( $row = $result->fetch_assoc ( ) ) {  
                array_push ( $rows, $row ); 
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

    public function digestJson ( string $data = null ): array {
        array_push ( self::$message, "Use model digest" );
        return self::$instance->data = self::$instance->model->digest ( $data );
    }

    public function run ( ): string 
    {

        $ins = self::$instance;
        $action = $ins->data [ "action" ];
        $table = $ins->data [ "table" ];
        $data = ( !empty ( $ins->data [ "data" ] ) ) ? $ins->data [ "data" ] : null;
        $fields = ( !empty ( $ins->data [ "fields" ] ) ) ? $ins->data [ "fields" ] : null;
        $id = ( !empty ( $ins->data [ "id" ] ) ) ? $ins->data [ "id" ] : null;
        $condition = ( !empty ( $ins->data [ "condition" ] ) ) ? self::$instance->model->parseJsonToItem ( json_encode ( $ins->data [ "condition" ] ) ): null;

        switch ( $action ) {
            case "create":
                $parse = $ins->model->parseJsonToFieldsAndValues ( $data );
                $ins->response = json_encode ( $ins->create ( $table, $parse [ "fields" ], $parse [ "values" ] ) );
                break;
            case "read":
                $cond = ( $id == "*" || $id == "" ) ? " id > 0" :  "id = {$id}";
                $cond = ( NULL !== $condition ) ? "{$cond} AND {$condition}" : $cond;
                $ins->response = json_encode ( $ins->read ( $table, $fields, "WHERE {$cond}" ) );
                break;
            case "update":
                $data = $ins->model->parseJsonToItem ( $data );
                $cond = ( $id == "*" || $id == "" ) ? " id > 0" :  "id = {$id}";
                $cond = ( NULL !== $condition ) ? "{$cond} AND {$condition}" : $cond;
                $ins->response = json_encode ( $ins->update ( $table, $data, $cond ) );
                break;
            case "delete": 
                $cond = ( $id == "*" || $id == "" ) ? " id > 0" :  "id = {$id}";
                $cond = ( NULL !== $condition ) ? "{$cond} AND {$condition}" : $cond;
                $ins->response = json_encode ( $ins->delete ( $table, $cond ) );
                break;
            default:
                break;
        };

        array_push ( self::$message, "Use Crud run" );

        return self::$instance->response;
    }

    public function response ( ): string 
    { 
        array_push ( self::$message, "return Crud response" );
        return self::$instance->response;
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