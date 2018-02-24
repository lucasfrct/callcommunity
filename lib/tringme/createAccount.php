<?php

include_once ( "tringmehelper.php" ); 

$publickey = "yourpublicapikey"; 

$privatekey = "yourprivateapikey"; 

$email ='someemail@somedomain.com'; 

$name ='Some Name'; 

$password ='SomePassword';

TringMeCreateUser($email, $password, $result, $name); 