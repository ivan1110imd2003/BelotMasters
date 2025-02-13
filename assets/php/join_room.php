<?php

session_start();
require 'conn.php';

if(isset($_POST["JcodeRoom"])) {
    $room_code = $_POST["JcodeRoom"];
    $sql = "SELECT * FROM rooms WHERE code = '$room_code'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if($row["player2"] == NULL) {
            $sql = "UPDATE rooms SET player2 = '$_SESSION[id]' WHERE code = '$room_code'";
            if ($conn->query($sql) === TRUE) {
                echo "success";
                $_SESSION["room_code"] = $room_code;
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else if ($row["player3"] == NULL) {
            $sql = "UPDATE rooms SET player3 = '$_SESSION[id]' WHERE code = '$room_code'";
            if ($conn->query($sql) === TRUE) {
                echo "success";
                $_SESSION["room_code"] = $room_code;
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else if ($row["player4"] == NULL) {
            $sql = "UPDATE rooms SET player4 = '$_SESSION[id]' WHERE code = '$room_code'";
            if ($conn->query($sql) === TRUE) {
                echo "success";
                $_SESSION["room_code"] = $room_code;
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "full";
        }
    } else {
        echo "not found";
    }
}

?>