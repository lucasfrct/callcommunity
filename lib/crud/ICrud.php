<?php 
#ICrud.php

interface ICrud 
{
    public function query ( string  $sql, $options  );

    public function create ( string $table, string $fields, string $values ): bool;

    public function read ( string $table, string $fields, string $query ): array; 

    public function update ( string $table, string $fields, string $query  ): bool ;

    public function delete ( string $table, string $query ): bool;
}