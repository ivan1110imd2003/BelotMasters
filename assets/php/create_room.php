<?php
session_start();
require 'conn.php';

function generateRoomCode() {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $roomCode = '';
    for ($i = 0; $i < 6; $i++) {
        $roomCode .= $characters[rand(0, $charactersLength - 1)];
    }
    return $roomCode;
}

if(isset($_POST["createGame"])) {
    $room_code = generateRoomCode();
    
    $sql = "INSERT INTO rooms (code, player1, room_owner)
    VALUES ('$room_code', '$_SESSION[id]','$_SESSION[id]')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION["room_code"] = $room_code;
        echo $room_code;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
