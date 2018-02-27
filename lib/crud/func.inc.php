<?php
#func.inc.php 

function __print ( string $msg = null ) 
{
    if ( $msg !== null ) {
        echo "<br>".$msg;
    };
}

function imprime ( $obj = null ) 
{
    $obj = ("true" == $obj || true === $obj ) ? "true" : $obj;
    $obj = ("false" == $obj || false === $obj ) ? "false" : $obj;

    if ( $obj !== null ) {
        echo "<br>".json_encode ( $obj );
    } else {
        __print ( "<h4>fall function imprime</h4>" );
    };
}

function alert ( $obj = null ) 
{
    if ( $obj !== null ) {
	   echo '<h3 style="position:relative !important;padding:5px;z-index:10000 !important;background:rgba(255,0,0,0.6);color:#FFFFFF;top:0;border:solid 2px #F00;">'.json_encode ( $obj ).'</h3>';
    } else {
        __print ( "fall function __echo" );
    };
}

function boxalert ( $obj = null ) 
{
    if ( $obj !== null ) {
       echo "<script> alert(".json_encode ( $obj ).") </script>";
    } else {
        __print ( "fall function alert" );
    };
}

function __date ( ) 
{
    date_default_timezone_set('America/Sao_Paulo');
    return date("Y-m-d H:i:s");
}; 

$imprime = 'imprime';
$imprima = 'imprime';
$mostre = 'imprime';
$show = 'imprime';
$p = 'imprime';
$text = 'imprime';
$alert = 'alert';
$boxalert = 'boxalert';
$alertbox = 'boxalert';

/*
#test
__print ( "__print" );
imprime ( "imprime" );
$imprime ( "imprime" );
$imprima ( "imprima" );
$mostre ( "mostre" );
$show ( "show" );
$p ( "p" );
$text ( "text" );
alert ( "alert");
$alert ( "alert" );
#boxalert ( "boxalert" );
#$boxalert ( "boxalert" );
#$alertbox ( "alertbox" );
*/