<?php
require 'conn.php';

if(isset($_POST["register"])) {
    $uname = $_POST["unameR"];
    $email = $_POST["emailR"];
    $pass = $_POST["passR"];

    $pass = hash("sha384", $pass);

    $sql = "INSERT INTO user (uname, password, game_curent , email)
    VALUES ('$uname', '$pass', '0' , '$email')";

    if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

?>