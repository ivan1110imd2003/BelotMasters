<?php
session_start();

if(isset($_POST["inSession"])) {
    if(isset($_SESSION["id"]) && isset($_SESSION["uname"])) {
        echo "success";
    } else {
        echo "0 results";
    }
}

?>