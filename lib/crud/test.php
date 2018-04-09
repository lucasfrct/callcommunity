<?php
require_once ("autoload.php");

use Tester as Tester;
use Connect as Connect;
use Modeldata as Modeldata;
use Crud as Crud;

#Tester::on ( "", function ( $assert ) { $assert::ok ( true, "" ); } );

Tester::on ( "Instance - Connect::on ( );", function ( $assert ) {
	$connect = ( Connect::on ( ) ) ? true : false;
	Connect::off ( );
	$assert::ok ( $connect , "Instancia a Classe connect: ".Connect::report ( ) );
}, 100 );

Tester::on ( "Drop Database - Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( "DROP DATABASE IF EXISTS tester;" ), "Delete Database tester se existir: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Create Database - Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( "CREATE DATABASE IF NOT EXISTS tester;" ), "Crie Database tester se não existir: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Drop Table - Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( "DROP TABLE IF EXISTS tester.test;" ), "Delete tabela test se existir: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Create Table  - Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( 
		"CREATE TABLE IF NOT EXISTS tester.test (
		id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
		enable BOOLEAN DEFAULT TRUE,
		name VARCHAR ( 255 ) NOT NULL
		);" 
	), "Crie tabela test se não existir: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Insert Table  - Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( 
		"INSERT INTO tester.test ( name ) 
		VALUES ( 'Teste' );"
	), "Inset name na tabela test: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Select Table - Connect::on ( )->query ( );", function ( $assert ) {
	$result = Connect::on ( )->query ( "SELECT name FROM tester.test WHERE enable = true LIMIT 100" );
	$ok = ( $result->num_rows > 0 ) ? true : false;
	$result->close ( );
	$assert::ok ( $ok, "Select name na tabela test: ".Connect::report ( ) );
	Connect::off ( );
}, 1 );

Tester::on ( "Update Table - Connect::on ( )->query ( );", function ( $assert ) {
	$con = Connect::on ( );
	$con->query ( "UPDATE tester.test SET name = 'name' WHERE enable = true" );
	$ok = ( $con->affected_rows > 0 ) ? true : false;
	$assert::ok ( $ok , "Update name na tabela test.".Connect::report ( ) );
	Connect::off ( );
} );

Tester::on ( "Delete Table - Connect::on ( )->query ( );", function ( $assert ) {
	$con = Connect::on ( );
	$con->query ( "UPDATE tester.test SET enable = false WHERE enable = true" );
	$ok = ( $con->affected_rows > 0 ) ? true : false;
	$assert::ok ( $ok , "Delete name na tabela test.".Connect::report ( ) );
	$con->query ( "UPDATE tester.test SET enable = true WHERE enable = false" );
	Connect::off ( );
} );

Tester::on ( "parseBool ( data ) ", function ( $assert ) {
	$assert::ok ( Modeldata::on ( )->parseBool ( "true" ), "Transforma string true em bool TRUE" );
} );

Tester::on ( "parseJsonToFieldsAndValues ( json )", function ( $assert ) {
	$json = '{"field1": "value1", "field2": "value2"}';
	$parse = Modeldata::on ( )->parseJsonToFieldsAndValues ( $json );
	$test = ( isset ( $parse [ "fields" ] ) && !empty ( $parse [ "fields" ] ) ) ? true : false;
	$assert::ok ( $test, "Testa se converte json para array com fields e values separados." );
} );

Tester::on ( "parseJsonToItems (  json )", function ( $assert ) { 
	$json = '{"field1": "value1", "field2": "value2"}';
	$items = Modeldata::on ( )->parseJsonToItem ( $json );
	$assert::ok ( ( !empty ( $items ) ) ? true : false , " Testa se converte json em itens separados por virgula" ); 
} );

Tester::on ( "digest ( json )", function ( $assert ) { 
	$data = '{ "action": "create", "table":"address", "data": { "street": "astreet", "city": "bcity", "country": "ccountry"} }';
	$model = Modeldata::on ( )->digest ( $data );
	$test = ( $model [ "action" ] == "create" && $model [ "table"] == "address" && !empty ( $model [ "data" ] ) ) ? true : false;
	$assert::ok ( $test, "Testa se o método digest transforma json em array" ); 
} );

Tester::on ( "Crud : create ", function ( $assert ) { 
	$create = '{ "action": "create", "table":"tester.test", "data": { "name": "create" } }';
	$crud = Crud::on ( );
	$crud->digestJson ( $create );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action create e insere no banco de dados: ".Crud::report ( ) );
	Crud::off ( );
} );

Tester::on ( "Crud read", function ( $assert ) { 
	$read = '{ "action": "read", "table":"tester.test", "fields": "name", "id": "" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $read );
	$crud->run ( );
	$test = ( count ( json_decode( $crud->response ( ) ) ) > 0 ) ? true : false;
	$assert::ok ( $test, "Testa se o crud interpreta o json com action read e tras dados do banco de dados: ".Crud::report ( ) ); 
	Crud::off ( );
} );

Tester::on ( "Crud update", function ( $assert ) {
	$update = '{ "action": "update", "table":"tester.test", "data":{ "name":"update" }, "id":"1" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $update );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action update e atualiza o banco de dados".Crud::report ( ) );
	Crud::off ( );
} ); 

Tester::on ( "Crud delete", function ( $assert ) { 
	$delete = '{ "action": "delete", "table": "tester.test", "id":"1" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $delete );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action delete e atualiza o banco de dados".Crud::report ( ) ); 
	Crud::off ( );
} );

Tester::on ( "crud->create ( table, fields, values );", function ( $assert ) {
	$crud = Crud::on ( );
	$assert::ok ( $crud->create ( "tester.test", "name", "'crud create'" ), "Testa crud->create ( ) diretamente. ".Crud::report ( ) );
	Crud::off ( );
} );

Tester::on ( "crud->read ( table, fields, condition );", function ( $assert ) {
	$crud = Crud::on ( );
	$response = $crud->read ( "tester.test", "*", '' );
	$assert::ok ( count ( $response ) > 0 , "Testa crud->read ( ) diretamente. ".count ( $response )." valores retornados. ".Crud::report ( ) );
	Crud::off ( );
} );

Tester::on ( "crud->updade ( table, set, condition )", function ( $assert ) {
	$crud = Crud::on ( );

	$assert::ok ( $crud->update ( "tester.test", "name = 'crud update'", "WHERE id = 1" ), "Testa crud->update ( ) diretamente. ".Crud::report ( ) );
	Crud::off ( );
} );

Tester::on ( "crud->delete ( table, condition )", function ( $assert ) {
	$crud = Crud::on ( );
	$assert::ok ( $crud->delete ( "tester.test", "WHERE id = 2" ), "Testa crud->delete ( ) diretamente. ".Crud::report ( ) );
	Crud::off ( );
} );

#Tester::on ( "", function ( $assert ) { $assert::ok ( true, "" ); } );*/