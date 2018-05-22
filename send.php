<?php 

// from http://wezfurlong.org/blog/2006/nov/http-post-from-php-without-curl


function callAPI($method, $url, $data){
   $curl = curl_init();
   switch ($method){
      case "POST":
         curl_setopt($curl, CURLOPT_POST, 1);
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
         break;
      case "PUT":
         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                         
         break;
      default:
         if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
   }
   // OPTIONS:
   curl_setopt($curl, CURLOPT_URL, $url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'Access-Token: 7338d6b3a783543e6c0788bf92ad34a6',
      'Content-Type: application/json',
      'Accept: application/json'
   ));
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
   // EXECUTE:
   $result = curl_exec($curl);
   if(!$result){die("Connection Failure");}
   curl_close($curl);
   return $result;
}


$data = array ( 
	"numero_destino"=> "12991285145",
	"mensagem"=> "teste Total Voice JSON 2",
	"resposta_usuario"=> true,
	"multi_sms"=> true,
	"data_criacao"=> "2017-03-30T17:17:14-03:00"
);

$params = array (
	'http'=> array (
       	'method'=> 'POST',
       	"header"=>  array ( 
       		"Content-Type"=> "application/json",
       		"Accept"=> "application/json",
       		"Access-Token"=> "7338d6b3a783543e6c0788bf92ad34a6",
    	),
       	'content'=> http_build_query ( $data ),
    )
);

callAPI( "POST", "https://api.totalvoice.com.br/sms", json_encode ( $data ) );