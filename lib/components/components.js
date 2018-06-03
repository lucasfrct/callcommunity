function toggleClass ( $class = "", $set = "active" ) {
	document.querySelector( $class ).classList.toggle ( $set );
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





