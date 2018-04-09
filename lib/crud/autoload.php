<?php
spl_autoload_register( function ( $class ) {
	//echo "<b>".str_replace ( "\\", "/", $class.'.php' )."</b><br>";
    require_once ( str_replace ( "\\", "/", $class.'.php' ) );
} );