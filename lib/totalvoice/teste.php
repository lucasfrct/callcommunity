<?php

include_once ( "vendor/autoload.php" );

// Considero que já existe um autoloader compatível com a PSR-4 registrado

use TotalVoice\Client as TotalVoiceClient;

$client = new TotalVoiceClient('{{7338d6b3a783543e6c0788bf92ad34a6}}');
$response = $client->sms->enviar('12991285145', 'SUA MENSAGEM');

echo $response->getContent(); // {}/