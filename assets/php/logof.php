<?php
    session_start();
    
    if(isset($_POST["logoff"])) {
        session_unset();
        session_destroy();

        echo "success";
    }
    

?>