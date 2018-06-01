function toggleClass ( $class ) {
	document.querySelector( $class ).classList.toggle ( "active" );
};


function launchIntoFullscreen (  ) {

    document.addEventListener ( "click", function ( e ) {

        $element = document.documentElement;
    
        if ( $element.requestFullscreen ) {
            $element.requestFullscreen ( );

        } else if ( $element.mozRequestFullScreen ) {
            $element.mozRequestFullScreen ( );

        } else if ( $element.webkitRequestFullscreen ) {
            $element.webkitRequestFullscreen ( );

        } else if ( $element.msRequestFullscreen ) {
            $element.msRequestFullscreen ( );
        };
    } );
};

launchIntoFullscreen ( );





