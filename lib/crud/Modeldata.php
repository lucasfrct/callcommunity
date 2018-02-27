<?php
#Modeldata.php
namespace app\crud;

class Modeldata 
{
    private static $instance = null;

    public static function on ( ): Modeldata 
    {
        if ( null === self::$instance ) {
            self::$instance = new self ( );
        };

        return self::$instance;
    }

    public function parseBool ( $data = null ) 
    {
        switch ( $data ) {
            case "true":
                return true;
                break;
            case 'true':
                return true;
                break;
            case "false":
                return false;
                break;
            case 'false':
                return false;
                break; 
            default:
                return $data;
                break;
        };
    }

    public function parseJsonToItem ( string $data = null ): string 
    {
        $itens = array ( );

        foreach ( json_decode ( $data, true ) as $field=> $value ) {
            $value = self::$instance->parseBool ( $value );
            array_push ( $itens, "{$field}='{$value}'" );
        };

        return implode ( ",", $itens );
    }

    public function parseJsonToFieldsAndValues ( string $data = null ): array 
    {
        $parse = array ( "fields"=> array ( ) , "values"=> array ( ) );

        if ( !empty ( $data ) ) {

            foreach ( json_decode ( $data, true ) as $field=> $value ) {
                if ( isset ( $parse [ "fields" ] ) ) {
                    array_push ( $parse [ "fields" ], $field );
                };
                if ( isset ( $parse [ "values" ] ) ) {
                    $value = self::$instance->parseBool ( $value );
                    array_push ( $parse [ "values" ], "'".$value."'" );
                };
            };
        };

       $parse [ "fields"] = implode ( ",", $parse [ "fields"] );
       $parse [ "values"] = implode ( ",", $parse [ "values"] );
       return $parse;
    }

    public function digest ( string $data = null ): array 
    {
        $digest = array ( );

        foreach ( json_decode ( $data ) as $field=> $value ) {
            $digest = array_merge ( $digest, array ( $field=>$value ) );
        };

        if ( isset ( $digest["data"] ) ) {
            $digest["data"] = json_encode ( $digest["data"] );
        };

        return $digest;
    }

    private function __construct ( ) { }

    private function __clone ( ) { }
    
    private function __wakeup ( ) { }
}

#$json = '{"field": "value", "ftest": "vtest"}';
#$data = '{ "action": "create", "table":"address", "data": { "street": "astreet", "city": "bcity", "country": "ccountry"} }';
#$model = Modeldata::on ( );
#echo $model->parseBool ( "parsebool" );
#$parse = $model->parseJsonToFieldsAndValues ( $json );
#echo $parse [ "fields" ];
#echo $parse [ "values" ];
#var_dump ( $model->parseJsonToItem ( $json ) );
#var_dump ( $model->digest ( $data ) );