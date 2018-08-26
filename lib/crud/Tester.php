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
    border-left-width: 7px;
    display block; margin: 1px 0; 
    padding: 7px 14px 14px 14px; 
    min-height: 60px; 
    background-color: #EEEEEE;
    font-size: 14px;
    margin-bottom: 7px;
}

.container h5 {
    margin: 0;
    padding: 3px 0;
    font-size: 1.2em;
}

.container h5 > small {
    float: right;
    position: relative;
    right: 0;
    font-size: 0.65em;
}

.container > small, .container > section {
    font-size: 0.9em;
    display: block;
    background-color: #DDD;
    padding: 7px;
    border-left: solid 3px transparent;
}

.container > small {
    margin: 14px 0 0 0;
}
.container > small sub {
    font-size: 0.8em;
}
.container > small em {
    float: right;
    right: 0;
}
.container > section {
    background-color: #BBB;
}
</style>';

class Tester 
{
    private static $instance = NULL;
    private $success = array ( "#0A0", "rgba(0,190,0,0.2)" );
    private $error = array ( "#C00", "rgba(190,0,0,0.2)" );
    
    private $unity = Array ( 
        "status"=> FALSE,
        "title"=> "", 
        "timeInit"=> 0,
        "timeTotal"=> 0,
        "tester"=> Array ( )
    );

    private $tester = Array (
        "status"=> FALSE,
        "timeInit"=> 0,
        "timeTotal"=> 0,
        "description"=> ""
    );

    private function timeInit ( ) 
    {
        return self::$instance->unity [ "timeInit" ] = microtime ( TRUE );
    }

    private function timeTotal ( ) 
    {   
        return self::$instance->unity [ "timeTotal"] = ( microtime ( TRUE ) - self::$instance->unity [ "timeInit"] );
    }

    private function unityReset ( ) 
    {
        self::$instance->unity [ "status" ] = FALSE;
        self::$instance->unity [ "title" ] = "Test Undefined!";
        self::$instance->unity [ "timeTotal" ] = 0;
        self::$instance->unity [ "tester" ] = Array ( );

        return self::$instance->unity;
    }

    private function testerReset ( ) 
    {
        self::$instance->tester [ "status" ] = FALSE;
        self::$instance->tester [ "timeInit" ] = 0;
        self::$instance->tester [ "timeTotal" ] = 0;
        self::$instance->tester [ "description" ] = "Undefined!";

        return self::$instance->tester;
    }

    private function inner ( array $unity ) 
    {    
        $set = ( $unity [ "status" ] !== FALSE ) ? self::$instance->success : self::$instance->error;

        echo '<div class="container" style="border-color: '.$set [ 0 ].'">
            <h5>'.$unity [ "title" ].'<small>Tempo: '.round ( ( $unity [ "timeTotal" ] * 1000 ), 2 ).' ms</small></h5>';
        
        foreach ( $unity [ "tester" ] as $tester ) {
            $status = ( $tester [ "status" ] !== FALSE ) ? self::$instance->success : self::$instance->error;
        echo '<small style="border-color: '.$status [ 1 ].'">
                <span>Tempo Médio: '.round ( ( $tester [ "timeTotal" ] * 1000 ), 2 ).' ms</span> 
                <em></em>
            </small>
            <section style="background-color: '.$status [ 1 ].'; border-color: '.$status [ 1 ].'">'.$tester [ "description" ].'</section>';
        };

        echo '</div>';
    }

     public static function ok ( bool $status = FALSE, string $description = NULL ): bool
    { 
        self::$instance->unity [ "status" ] = ( $status === TRUE && self::$instance->unity [ "status" ] === TRUE ) ? TRUE : FALSE;
        self::$instance->testerReset ( );


        self::$instance->tester [ "status" ] = $status;
        self::$instance->tester [ "timeInit" ] = self::$instance->init;

        # Ponto para iniciar o tempo do próximo teste ::ok ( );
        self::$instance->init = microtime ( TRUE );
        
        self::$instance->tester [ "timeTotal" ] = ( self::$instance->init - self::$instance->tester [ "timeInit" ] );
        self::$instance->tester [ "description" ] = $description;

        array_push ( self::$instance->unity [ "tester" ], self::$instance->tester );

        return self::$instance->tester [ "status" ];
    }

    public static function equals ( $item1, $item2, string $description = "" ): bool
    {
        return self::ok ( serialize ( $item1 ) === serialize ( $item2 ) , $description );
    }

    public static function on ( string $title = "", Closure $fn = NULL ) 
    {
        #instance New class in Singleton
        if ( self::$instance === NULL ) {
            self::$instance = new self;
        };

        if ( ( self::$instance !== NULL && empty ( $title ) ) || ( self::$instance !== NUll && $fn === NULL ) ) {
            self::$instance->unityReset ( );
            self::$instance->inner ( self::$instance->unity );
        };

        if ( self::$instance !== NULL && !empty ( $title ) && is_string ( $title ) && $fn instanceof Closure ) {

            self::$instance->unityReset ( );
            self::$instance->init = self::$instance->timeInit ( ); 
            
            self::$instance->unity [ "status" ] = TRUE;
            self::$instance->unity [ "title" ] = $title;
            
            $fn ( self::$instance );

            self::$instance->timeTotal ( );
            self::$instance->inner ( self::$instance->unity );
        };
    }
};