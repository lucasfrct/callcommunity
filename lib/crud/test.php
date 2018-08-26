<?php
require_once ( "autoload.php" );

use Tester as Tester;
use Connect as Connect;
use Modeldata as Modeldata;
use ICrud as ICrud;
use Crud as Crud;

#Tester::on ( "title", function ( $assert ) { $assert::ok ( TRUE, "decription" ); } );
#Tester::on ( "title", function ( $assert ) { $assert::equals ( $object1, $object2, "description" ); } );

Tester::on ( 'Connect', function ( $assert ) {
	$assert::ok ( Connect::on ( "127.0.0.1:3306", "root", "", "mysql" ) !== NULL , 'Testa se existe alguma intância válida para a classe Connect::on ( "127.0.0.1:3306", "root", "", "mysql" );' );
    
    $assert::ok ( Connect::off ( ) === NULL , 'Testa se a classe Connect foi destruida: Connect::off ( );' );
    
    $assert::ok ( !empty ( Connect::debug ( ) ), 'Testa se a classe foi debugada: '.Connect::debug ( ) );
} );

Tester::on ( 'Crud', function ( $assert ) {
    $conn = Connect::on ( "127.0.0.1:3306", "root", "", "test" );
    $crud = Crud::on ( $conn );
    
    $assert::ok ( $crud !== NULL, "Teste se a classe Crud foi iniciada: Crud::on ( connect );" );
    
    $assert::ok ( $crud->create ( "test", "user, password", "'admin','admin'" ), '(CREATE) - Testa se o Cruda está inserindo dados: $crud->create ( "test", "user, password", "\'admin\',\'admin\'" );' );
    
    $assert::ok ( count ( $crud->read ( "test", "user", 'user = "admin"' ) ) > 0, '(READ) - Testa se Crud faz consulta e retorna uma array: $crud->read ( "test", "user", \'user = "admin"\' )' );
    
    $assert::ok ( $crud->update ( "test", "password = 'adminPass'", "id >= 0" ), '(UPDATE) - Testa se o Crud está atualizando dados: $crud->update ( "test", "password = \'adminPass\'", "id >= 0" );' );
    
    $assert::ok ( $crud->delete ( "test", "id >= 0" ), '(DELETE) - Testa se o Crud está deletando daddos: crud->delete ( "test", "id >= 0" );' );
    
    $assert::ok ( count ( $crud->debug ( ) ) > 0, "Testa se a classe Crud foi debugada: ".$crud->debug ( ) );
    
    $assert::ok ( $crud->off ( ) === NULL, "Testa se a Classe Crud foi destruida: crud->off ( );" );
} );

Tester::on ( "Modeldata", function ( $assert ) { 
    $model = new Modeldata ( Crud::on ( Connect::on ( "127.0.0.1:3306", "root", "", "test" ) ) );
    
    $assert::ok ( $model !== NULL, "Testa se a classe Modeldata foi iniciada: model = new Modeldata ( Crud::on ( Connect::on ( \"127.0.0.1:3306\", \"root\", \"\", \"test\" ) ) )" );
    
    #CREATE
    $assert::ok ( $model->digest ( '{ "action": "create", "table": "test", "data": { "user": "modeldata", "password": "model1234", 
    "parent": [ { "name": "p" }, { "name": "pp" }, { "name": "ppp" } ] 
} }' ), "(CREATE) - Testa se a Classe Modeldata está inserindo dados: model->digest ( '{ \"action\": \"create\", \"table\": \"test\", \"data\": { \"user\": \"modeldata\", \"password\": \"model1234\", 
    \"parent\": [ { \"name\": \"p\" }, { \"name\": \"pp\" }, { \"name\": \"ppp\" } ] 
} }' )" );

    #READ
    $read = $model->digest ( '{ "action": "read", "table": "test", "fields": "id, user, parent", "query": "id >= 1" }' );
    $assert::ok ( strlen ( $read ) > 4, "(READ) - Testa se a Classe Modeldata está consultando dados:  model->digest ( '{ \"action\": \"read\", \"table\": \"test\", \"fields\": \"id, user, parent\", \"query\": \"id >= 1\" }' ); || = {$read} " );

    #UPDATE
    $assert::ok ( $model->digest ( '{ "action": "update", "table": "test", "data": { "password" : "model update" }, "query": "id >= 0" }' ), "(UPDATE) - Testa se a Classe Modedata esta atualizando os dados: model->digest ( '{ \"action\": \"update\", \"table\": \"test\", \"data\": { \"password\": \"model update\" }, \"query\": \"id >= 0\" }' );" );

    #DELETE
    $assert::ok ( $model->digest ( '{ "action": "delete", "table": "test", "query": "id >= 0" }' ), "(DELETE) - Testa se a Classe Modeldata está deletando dados: model->digest ( '{ \"action\": \"delete\", \"table\": \"test\", \"query\": \"id >= 0\" }' );" );

    $assert::ok ( count ( $model->debug ( ) ) > 0, "Testa se a Classe Modeldata foi debugada: ".$model->debug ( ) );

} );