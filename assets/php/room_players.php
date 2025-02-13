<?php

require 'conn.php';
session_start();

if(isset($_POST["roomPlayers"])) {
    $room_code = $_SESSION["room_code"];
    $players = [];

    $sql = "SELECT player1, player2, player3, player4 FROM rooms WHERE code = '$room_code'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        
        $row = $result->fetch_assoc();

        for ($i = 1; $i < 5; $i++) {
            $player = $row["player$i"];
            if ($player == NULL) {
                $players[$i] = "Празно място";
                continue;
            }

            $sql = "SELECT uname FROM user WHERE id = $player";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                
                $row1 = $result->fetch_assoc();
                
                $players[$i] = $row1["uname"];
            }

            if($i == 1 && $player == $_SESSION["id"]) {
                $players[5] = 1;
                continue;
            }
        }

        echo json_encode($players);
    } else {
        echo "not found";
    }
}

?>