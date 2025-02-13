<?php
session_start();
require 'conn.php';

if(isset($_POST["register"])) {
    $uname = $_POST["unameR"];
    $email = $_POST["emailR"];
    $pass = $_POST["passR"];

    $pass = hash("sha384", $pass);

    $sql = "INSERT INTO user (uname, password, game_curent , email)
    VALUES ('$uname', '$pass', '0' , '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "success";

        $sql = "SELECT id, uname, password, game_curent, email FROM user WHERE email='$email' AND password = '$pass'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $_SESSION["id"] = $row["id"];
                $_SESSION["uname"] = $row["uname"];
            }
        } else {
            echo "0 results";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

?>