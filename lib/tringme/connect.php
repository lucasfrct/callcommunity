<?php

include_once ("tringmehelper.php"); 

$publickey = "yourpublicapikey"; 

$privatekey = "yourprivateapikey"; 

$callsrc ='18585551111'; 

$calldest ='18585552222'; 

TringMeCall($privatekey, $publickey, $callsrc, $calldest);