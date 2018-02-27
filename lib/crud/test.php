<?php
require_once ("autoload.php");

#Tester::on ( "", function ( $assert ) { $assert::ok ( true, "" ); } );

Tester::on ( "Connect::on ( );", function ( $assert ) {
	$connect = ( Connect::on ( ) ) ? true : false;
	Connect::off ( );
	$assert::ok (  $connect , "Instancia a Classe connect: ".Connect::report ( ) );
}, 10 );

Tester::on ( "Connect::on ( )->query ( );", function ( $assert ) {
	$assert::ok ( Connect::on ( )->query ( "INSERT INTO users ( name, email, emailSecurity, password ) VALUES ( 'Name', 'Email 1', 'email Sec', 'Pass' )" ), "Registrar insert em banco de dados: ".Connect::report ( ) );
	Connect::off ( );
}, 10 );

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
	$assert::ok ( $test, "Testa se o metodo digest transforma json em array" ); 
} );

Tester::on ( "Crud : create ", function ( $assert ) { 
	$create = '{ "action": "create", "table":"crud.address", "data": { "idUser": "1", "street":"street1", "city": "city1", "country":"country1" } }';
	$crud = Crud::on ( );
	$crud->digestJson ( $create );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action create e insere no banco de dados: ".Crud::report ( ) ); 
} );

Tester::on ( "Crud read", function ( $assert ) { 
	$read = '{ "action": "read", "table":"crud.address", "fields": "*", "id": "" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $read );
	$crud->run ( );
	$test = ( count ( json_decode( $crud->response ( ) ) ) > 0 ) ? true : false;
	$assert::ok ( $test, "Testa se o crud interpreta o json com action read e tras dados do banco de dados: ".Crud::report ( ) ); 
} );

Tester::on ( "Crud update", function ( $assert ) {
	$update = '{ "action": "update", "table":"crud.address", "data":{ "street":"s2", "city":"c2", "enable":1 }, "id":"1" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $update );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action update e atualiza o banco de dados" );
} ); 

Tester::on ( "Crud delete", function ( $assert ) { 
	$delete = '{ "action": "delete", "table": "crud.address", "id":"1" }';
	$crud = Crud::on ( );
	$crud->digestJson ( $delete );
	$crud->run ( );
	$assert::ok ( Modeldata::on ( )->parseBool ( $crud->response ( ) ), "Testa se o crud interpreta o json com action delete e atualiza o banco de dados"); 
} );

Tester::on ( "crud->create ( table, fields, values );", function ( $assert ) {
	$crud = Crud::on ( );

	$assert::ok ( $crud->create ( "crud.address", "idUser, street, city, country", '1, "streetA", "cityA", "countryA"' ), "Testa crud->create ( ) diretamente");
} );

Tester::on ( "crud->read ( table, fields, condition );", function ( $assert ) {
	$crud = Crud::on ( );
	$response = $crud->read ( "crud.address", "*", '' );
	$assert::ok ( count ( $response ) > 0 , "Testa crud->read ( ) diretamente. <sub>".count ( $response )."</sub> consultas");
} );

Tester::on ( "crud->updade ( table, set, condition )", function ( $assert ) {
	$crud = Crud::on ( );

	$assert::ok ( $crud->update ( "crud.address", "city='cityUpadate', enable=1", "WHERE id=2" ), "Testa crud->update ( ) diretamente." );
} );

Tester::on ( "crud->delete ( table, condition )", function ( $assert ) {
	$crud = Crud::on ( );
	$assert::ok ( $crud->delete ( "crud.address", "WHERE id=2" ), "Testa crud->delete ( ) diretamente." );
} );

#Tester::on ( "", function ( $assert ) { $assert::ok ( true, "" ); } );*/