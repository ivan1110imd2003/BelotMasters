<?php
require 'conn.php';

if(isset($_POST["login"])) {
    $email = $_POST["emailL"];
    $pass = $_POST["passL"];

    $pass = hash("sha384", $pass);

    $sql = "SELECT id, uname, password, game_curent, email FROM user WHERE email='$email' AND password = '$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Name: " . $row["uname"]. " " . $row["email"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    $conn->close();
}

?>