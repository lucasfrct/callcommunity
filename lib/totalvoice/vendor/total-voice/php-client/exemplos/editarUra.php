<?php
require_once "vendor/autoload.php";

use TotalVoice\Client as TotalVoiceClient;

$client = new TotalVoiceClient('7338d6b3a783543e6c0788bf92ad34a6');

$id = "10";
$nomeUra = "Ura Diurna";
$dados = array(
    [
        "acao"=>"tts",
        "opcao"=>"", 
        "menu" => "menu 1", 
        "acao_dados"=>[
            "mensagem"=> "Olá, bem vindo a totalvoice, digite 1 para suporte, 2 para financeiro"
        ]
    ],
    [
        "acao"=>"transferir",
        "opcao"=>"1", 
        "menu"=> "menu 1", 
        "acao_dados"=>[
            "numero_telefone"=> "4000"
        ]
    ],
    [
        "acao"=>"transferir",
        "opcao"=>"2", 
        "menu"=> "menu 1", 
        "acao_dados"=>[
            "numero_telefone"=> "4010"
        ]
        ]
);

$response = $client->central->atualizarUra($id, $nomeUra, $dados);
echo $response->getContent();