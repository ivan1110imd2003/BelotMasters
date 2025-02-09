<?php
$host = 'localhost';
$dbname = 'belotmasters';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if($conn->connect_error) {
    die("Connection failed: " . $e->getMessage());
}

?>