<?php 
    require 'conn.php';
    session_start();

    if(isset($_POST["roomCode"])) {
        $room_code = $_SESSION["room_code"];
        echo $room_code;
    }

?>