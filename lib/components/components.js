var $win = window;
var $doc = document;

function selector ( $element ) {
    return $doc.querySelector( $element );
};

function toggleClass ( $class = "", $set = "active" ) {
	$doc.querySelector( $class ).classList.toggle ( $set );
};

function addClass ( $element = "", $class = "" ) {
    $doc.querySelector ( $element ).classList.add ( $class );
};

function removeClass ( $element = "", $class = "" ) {
    $doc.querySelector ( $element ).classList.remove ( $class );
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





