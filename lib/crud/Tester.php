<?php
#Tester.php 

header ( 'Content-Type: text/html; charset=utf-8' );
error_reporting ( E_ALL ^ E_NOTICE );
error_reporting ( E_ALL );
ini_set ( 'error_reporting', E_ALL );
ini_set ( 'display_startup_errors', TRUE );
ini_set ( "display_errors", TRUE );
ini_set ( "default_charset", TRUE );

class Tester 
{
    private static $offset = 0.000007;
    private static $success = array ( "#0A0", "rgba(0,190,0,0.1)" );
    private static $error = array ( "#C00", "rgba(190,0,0,0.1)" );

    private static $status = false;
    private static $name = null;
    private static $msg = null;
    private static $repeat = 1;

    private static $timeOfTest = 0;
    private static $timeOfEachTest = 0;

    private static function reset ( ) 
    {
        self::$status = false;
        self::$name = null;
        self::$msg = null;
        self::$repeat = 1;
        self::$timeOfTest = 0;
        self::$timeOfEachTest = 0;

    }

    private static function assert ( ) 
    {
        return "Tester";
    }

    public static function ok ( bool $status = false, string $msg = null ): bool
    {
        self::$msg = $msg;
        return self::$status = $status;
    }

    private static function inner ( ) 
    {   
        $set = ( self::$status !== false ) ? self::$success : self::$error;

        $title = '<span><b>'.self::$name.' </b><small>'.round ( self::$timeOfEachTest, 6 ).'ms <sub>( x'.self::$repeat.' )</sub></small> </span>';
        $time = '<span style="float: right;text-align: right; rigth: 0;"><b>Tempo total: '.round ( ( self::$timeOfTest / 1000 ), 2 ).'s <small> ( '. round ( self::$timeOfTest, 4 ).'ms )</b></small></span>';
        $msg = '<div style="font-size: 10pt;">'.self::$msg.'</div>';

        echo '<div style="font-family: verdana, sans-serif;font-size: 10pt; display: block; border: solid 1px '.$set [ 0 ].'; background-color: '.$set [ 1 ].'; padding: 5px; margin: 2px 0;"><div style="display: block; margin-bottom: 4px; border-bottom: solid 1px '.$set [ 1 ].'; padding-bottom: 3px; width:100%;">'.$title.$time.'</div>'.$msg.'</div>';
    }

    private static function sum ( array $array = null ): float
    {
        return array_reduce ( $array, function ( $previous, $item ) {
            return $previous += $item;
        } );
    }

    public static function on ( string $name = null, Closure $fn = null, int $repeat = 1 ) 
    {
        self::reset ( );

        if ( is_string ( $name ) && $fn instanceof Closure && is_numeric ( self::$repeat ) ) {

            self::$name = $name;
            self::$repeat = $repeat;
            
            $timeOfFunctions = array ( );
            $init = microtime ( 1 );
            
            for ( $i = 0; $i < self::$repeat; $i++ ) {
                $time = microtime ( 1 );
                $fn ( self::assert ( ) );
                array_push ( $timeOfFunctions, ( ( microtime ( 1 ) - $time ) * 1000 ) );
            };

            $timeOfExec = ( ( ( microtime ( 1 ) - $init ) - self::$offset ) * 1000 );
            $timeOfEachExec = ( $timeOfExec / self::$repeat );

            $totalOfFunctions = self::sum ( $timeOfFunctions );
            $timeOfEachFunction = ( $totalOfFunctions / count ( $timeOfFunctions ) );
            
            self::$timeOfTest = ( ( $timeOfExec + $totalOfFunctions ) / 2 );
            self::$timeOfEachTest = ( ( $timeOfEachExec + $timeOfEachFunction ) / 2 );

        } else {
            self::$name = ( empty ( self::$name ) ) ? "Error!" : self::$name;
            self::$msg = " Erro de Sintaxe. Favor verificar os argumentos de entrada do teste.";
        };

        self::inner ( );
    }
}

#Tester::on ( "test 1", function ( $assert ) { $assert::ok ( true, "msg" ); }, 1000 );