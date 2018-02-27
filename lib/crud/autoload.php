<?php
spl_autoload_register( function ( $class ) {
	#echo "<br><b>".str_replace ( "\\", "/", $class.'.php' )."</b>";
    require_once ( str_replace ( "\\", "/", $class.'.php' ) );
} );