<?php

function sender ( string $url = "", array $data = NULL, Closure $callback = NULL ) {

	$result = "";

	$headers = array ( 
		"POST HTTP/1.0",
		"Content-Type: application/json",
		"Accept: application/json",
		"Access-Token: 7338d6b3a783543e6c0788bf92ad34a6"
	);

	$curl = curl_init ( $url );
	
	curl_setopt ( $curl, CURLOPT_HTTPHEADER, $headers );
	
	curl_setopt ( $curl, CURLOPT_USERAGENT, $_SERVER [ 'HTTP_USER_AGENT' ] );
	
	curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, FALSE );
	
	curl_setopt ( $curl, CURLOPT_POST, TRUE );

	curl_setopt ( $curl, CURLOPT_POSTFIELDS, json_encode ( $data ) );
	
	curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, TRUE );
	
	$result = curl_exec ( $curl );

	if ( curl_errno ( $curl ) ) {
		$result .= "\r\nERROR!!: ".curl_error ( $curl )."\r\n";
	};
	
	curl_close ( $curl );

	if ( !empty ( $url ) && !empty ( $data ) && NULL !== $callback ) {
		
		$json = json_decode ( $result );
		
		if ( !( $json && $result != $json ) ) {
			$result = json_encode ( $result );
		};

		$callback ( $result );
	};	
};


$data = array ( 
	"numero_destino"=> "12991285145",
	"mensagem"=> "teste CURL SMS.",
	"resposta_usuario"=> TRUE,
	"multi_sms"=> TRUE,
	"data_ciacao"=> "2017-03-30T17:17:14-03:00"
);

$url = "https://api.totalvoice.com.br/sms";

sender ( $url, $data, function ( $data ) {
	echo $data;
} );