<?php
#Tester.php 

header ( 'Content-Type: text/html; charset=utf-8' );
error_reporting ( E_ALL ^ E_NOTICE );
error_reporting ( E_ALL );
ini_set ( 'error_reporting', E_ALL );
ini_set ( 'display_startup_errors', TRUE );
ini_set ( "display_errors", TRUE );
ini_set ( "default_charset", TRUE );

echo '<style>
body {
    font-family: verdana, sans-serif;
}
.container { 
    border: solid 1px #9E9E9E;
    display block; margin: 1px 0; 
    padding: 7px 14px; 
    min-height: 60px; 
    background-color: #EEEEEE;
    font-size: 14px;
}

.container h5 {
    margin: 0px 0 7px 0;
    padding: 7px 0;
    font-size  1em;
}
.container small, .container section {
    font-size: 0.9em;
    display: block;
    background-color: #DDD;
    padding: 7px;

}
.container small sub {
    font-size: 0.8em;
}
.container small em {
    float: right;
    right: 0;
}
.container section {
    background-color: #BBB;
}
</style>';

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
        echo '<div class="container" style="border-color: '.$set [ 0 ].'">
            <h5>'.self::$name.'</h5>
            <small>
                <span>'.round ( self::$timeOfEachTest, 6 ).'ms</span> 
                <sub>(x'.self::$repeat.')</sub>
                <em>Tempo total: '.round ( ( self::$timeOfTest / 1000 ), 2 ).'s</em>
            </small>
            <section style="background-color:  '.$set [ 1 ].'">'.self::$msg.'</section>
        </div>';
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