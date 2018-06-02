function toggleClass ( $class ) {
	document.querySelectorAll( $class ).classList.toggle ( "active" );
};


function requestScreen (  ) {

    var $element = document.documentElement;
    
    if ( $element.requestFullscreen ) {
        $element.requestFullscreen ( );

    } else if ( $element.mozRequestFullScreen ) {
        $element.mozRequestFullScreen ( );

    } else if ( $element.webkitRequestFullscreen ) {
        $element.webkitRequestFullscreen ( );

    } else if ( $element.msRequestFullscreen ) {
        $element.msRequestFullscreen ( );
    };
};





