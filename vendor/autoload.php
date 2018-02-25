<?php

spl_autoload_register ( '__register_file' );

function __register_file ( $path ) {

    $file = str_replace ( '\\', '/', $path ).'.php';

    if ( file_exists ( $file ) ) {
    	echo "{$file} <br>";
        require_once ( $file );
    };

};