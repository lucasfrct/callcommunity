<?php 

require_once ( "TotalVoiceAPI.class.php" );

echo "teste";

$api = new TotalVoiceAPI ( "7338d6b3a783543e6c0788bf92ad34a6" );

$api->debugOn ( );

$api->returnAssoc ( );

print_r ( $api->consultaSaldo ( ) );

//print_r ( $api->enviaSMS ( "12991285145", "SMS teste total voice" ) );


//print_r($api->enviaTTS("**********", "Isto é um texto falado"));


//print_r($api->enviaAudio("**********", "https://api.evoline.com.br/painel/demo-song.mp3"));


#print_r($api->enviaChamada("**********", "**********"));


#echo "\n";
