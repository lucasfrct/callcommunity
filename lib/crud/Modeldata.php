<?php
#Modeldata.php

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

    public function parseJsonToItem ( $data = null ): string 
    {
        $itens = array ( );

        $data = ( is_array ( $data ) ) ? $data : json_decode ( $data, true );
        foreach ( $data as $field => $value ) {
            $value = self::$instance->parseBool ( $value );
            array_push ( $itens, ( string ) "{$field} = '".json_encode ( $value )."'" );
        };

        return implode ( ",", $itens );
    }

    public function parseJsonToFieldsAndValues ( $data = null ): array 
    {
        $parse = array ( "fields" => array ( ) , "values" => array ( ) );

        if ( !empty ( $data ) ) {
            $data = ( is_array ( $data ) ) ? $data : json_decode ( $data, true );
            
            foreach ( $data as $field => $value ) {
                if ( isset ( $parse [ "fields" ] ) ) {
                    array_push ( $parse [ "fields" ], $field );
                };
                if ( isset ( $parse [ "values" ] ) ) {
                    $value = self::$instance->parseBool ( $value );
                    array_push ( $parse [ "values" ], ( string ) "'".json_encode ( $value )."'" );
                };
            };
        };

       $parse [ "fields" ] = implode ( ",", $parse [ "fields" ] );
       $parse [ "values" ] = implode ( ",", $parse [ "values" ] );
       return $parse;
    }

    public function digest ( string $data = null ): array 
    {
        $digest = array ( );

        foreach ( json_decode ( $data, true ) as $field => $value ) {
            $digest = array_merge ( $digest, array ( $field => $value ) );
        };

        return $digest;
    }

    private function __construct ( ) { }

    private function __clone ( ) { }
    
    private function __wakeup ( ) { }
}
/*
$json = ' 
    [ 
    {
        "id": 1,
        "index": null,
        "title": "Exemplo de tarefa 1", 
        "date": "2018-4-3", 
        "hour": "8:00",
        "caller": true,
        "sms": true,
        "audio": { 
            "title": "Exempço de Áudio 1", 
            "description": "Exemplo da descrição do audio 1",
            "uri": "multimedia/audio.mp3", 
            "source": null, 
            "selected": true 
        },
        "message": { 
            "title": "Exemplo de mensagem 1", 
            "text": "Exemplo de texto para mensagem.", 
            "selected": true
        },
        "contacts": [ 
            { 
                "id": 1, 
                "index": null, 
                "name": "Exemplo de Contato 1", 
                "tel": "(00) 00000-0000", 
                "condominium": "Exemplo de endereço ou comcomínio, Bl:A Ap:122 A", 
                "selected": false
            },
            { 
                "id": 2, 
                "index": null, 
                "name": "Exemplo de Contato 2", 
                "tel": "(00) 00000-0000", 
                "condominium": "Exemplo de endereço ou comcomínio, Bl:A Ap:122 A", 
                "selected": false
            }
        ],
        "repeat": { 
            "dom": false,
            "seg": true, 
            "ter": false,
            "qua": false, 
            "qui": false,
            "sex": false,
            "sab": false
        }
    },
    {
        "id": 2,
        "index": null,
        "title": "Exemplo de tarefa 2", 
        "date": "2018-4-3", 
        "hour": "17:00",
        "caller": true,
        "sms": true,
        "audio": { 
            "title": "Exempço de Áudio 1", 
            "description": "Exemplo da descrição do audio 1",
            "uri": "multimedia/audio.mp3", 
            "source": null, 
            "selected": true 
        },
        "message": { 
            "title": "Exemplo de mensagem 1", 
            "text": "Exemplo de texto para mensagem.", 
            "selected": true
        },
        "contacts": [ 
            { 
                "id": 1, 
                "index": null, 
                "name": "Exemplo de Contato 1", 
                "tel": "(00) 00000-0000", 
                "condominium": "Exemplo de endereço ou comcomínio, Bl:A Ap:122 A", 
                "selected": false
            },
            { 
                "id": 2, 
                "index": null, 
                "name": "Exemplo de Contato 2", 
                "tel": "(00) 00000-0000", 
                "condominium": "Exemplo de endereço ou comcomínio, Bl:A Ap:122 A", 
                "selected": false
            }
        ],
        "repeat": { 
            "dom": false,
            "seg": true, 
            "ter": false,
            "qua": true, 
            "qui": false,
            "sex": true,
            "sab": false
        }
    }
]
';


$model = Modeldata::on ( );
#echo $model->parseBool ( "parsebool" );
#$parse = $model->parseJsonToFieldsAndValues ( $json );
#echo $parse [ "fields" ];
#echo $parse [ "values" ];
#var_dump ( $model->parseJsonToItem ( $json ) );
#var_dump ( $model->digest ( $json ) );
//print_r ( json_decode ( $json ) );
*/