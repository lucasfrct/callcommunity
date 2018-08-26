<?php

class NTP
{
    private $debug = Array ( );
    public $host = "pool.ntp.org";
    public $socket = NULL;
    public $timestamp = 0;

    # addiciona novas notificaçãoes no debug
    private function addDebug ( $debug  = null ) : void
    {
        if ( null != $debug ) {
            array_push ( $this->debug, $debug );
        };
    }

    # reporta uma string do debug
    public function debug ( ): string 
    {
        return json_encode ( $this->debug );
    }

    public function __construct ( string $host = "pool.ntp.org", string $timezone = "America/Sao_Paulo" ) 
    {
        date_default_timezone_set ( $timezone );

        $this->addDebug ( "New Instance" );
        $this->host  = $host;
        $this->addDebug ( "Load host: {$host}" );

        if ( !empty ( $this->host ) && NULL == $this->socket && $this->ping ( $this->host ) ) {
            $this->socket = $this->socketUDP ( $this->host );
            $this->timestamp = $this->parseTimestamp ( $this->socket );
        };

        return $this;
    }

    # Testa se o servidor esta online
    private function ping ( string $host = "" ) : bool 
    {       
        $server = @fsockopen ( "udp://{$host}:123", -1, $errCode, $errStr, 10 );
        @fclose ( $server );
        $ping = ( $server ) ? TRUE : FALSE;
        $this->addDebug ( "Ping : (".( ( $ping ) ? "ON" : "OFF" ).") ".$host );
        return $ping;
    }

    private function socketUDP ( string $host = "", $timeout = 10 )
    {
        $socket = stream_socket_client ( "udp://{$host}:123", $errno, $errstr, ( int ) $timeout );
        fwrite ( $socket, "\010".str_repeat ( "\0", 47 ) );
        $unpack = fread ( $socket, 48 );
        fclose ( $socket );
        $this->addDebug ( "Open Socket UDP:  udp://{$host}:123" );

        return $unpack;
    }

    private function parseTimestamp ( $unpack )
    {
        $data = unpack ( 'N12', $unpack );
        $timestamp = sprintf ( '%u', $data[9] );
        $timestamp -= 2208988800;
        $this->addDebug ( "parse to Timestamp: {$timestamp}" );

        return $timestamp;
    } 

    public function date ( string $options = "d/m/Y" )
    {
        return date ( $options, $this->timestamp );
    }

    public function hour ( string $options = "H:i:s" )
    {
        return date ( $options, $this->timestamp );
    }
};


#$ntp = new NTP;
#echo "<b>HOST:</b> ".$ntp->host."<br>";
#echo "<b>TIMESTAMP:</b> ".$ntp->timestamp."<br>";
#echo "<b>DATE:</b> ".$ntp->date ( )."<br>";
#echo "<b>Hour:</b> ".$ntp->hour ( )."<br><br>";
#echo $ntp->debug ( );