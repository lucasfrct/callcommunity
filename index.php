<?php

include_once ( "vendor/autoloader.php" );


// Consideramos que já existe um autoloader compatível com a PSR-4 registrado

use TotalVoice\Client as TotalVoiceClient;

#$client = new TotalVoiceClient('{{b70531d028a54dccddaa56c3c004f691}}');
#$response = $client->chamada->ligar('NUMERO-A', 'NUMERO-B');

#echo $response->getContent();


$client = new TotalVoiceClient('{{b70531d028a54dccddaa56c3c004f691}}');
$response = $client->sms->enviar('12991285145', 'Teste Total voice');

echo $response->getContent(); // {}